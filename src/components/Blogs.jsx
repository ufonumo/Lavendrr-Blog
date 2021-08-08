import axios from 'axios';
import React , {useState , useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInput, setBlogData } from '../features/userSlice'
import Spinner from 'react-bootstrap/Spinner'

const Blogs = () => {

    const searchInput = useSelector(selectUserInput);

    const blog_url = `${process.env.REACT_APP_BLOG_URL}/search?q=${searchInput}&token=${process.env.REACT_APP_BLOG_ID}`;
    const dispatch = useDispatch();
    const [blogs, setBlogs] = useState('');

    const [loading, setloading] = useState(true);

    useEffect(() => {
        axios.get(blog_url)
        .then((response) => {
            setloading(true)
            dispatch(setBlogData(response.data))
            setBlogs(response.data)
            setloading(false)
            console.log(response.data);
        })
        .catch((error) =>{
            console.log(error);
        })
    }, [searchInput])


    return (
        <>
            <div className="container">
                <div className="blog_pg">
                    <h1 className='mt-5'>Blog</h1>
                    {
                        loading ? 
                            <div className="text-center">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden r">Loading...</span>
                                </Spinner>
                            </div>
                            
                        : 
                        <>
                            <div className="row">                            
                                { blogs?.articles?.map((blog, index) => (
                                    <>
    	                                <div key={index} className="col-lg-4 blog_content">
                                            <div className="blog_container">
                                                <a href={blog.url} target='_blank'>
                                                    <img src={blog.image} alt={blog.name} />
                                                    <div className="content p-3">
                                                        <h6>
                                                            <span>{blog.source.name}</span>
                                                            <small className='ps-2'>{blog.publishedAt}</small>
                                                        </h6>
                                                        <h4>{blog.title}</h4>
                                                        <p>{blog.description}</p>
                                                    </div>
                                                   
                                                </a>
                                            </div>
                                           
                                        </div>
                                    </>
                                ))}
                            </div>
                        </>
                    }
                    {blogs?.totalArticles === 0 && (
                        <h2>!Oops, No blogs currently available for {searchInput} 😢. please search for something else. </h2>
                    )}
                </div>
            </div>
        </>
    )
}

export default Blogs
