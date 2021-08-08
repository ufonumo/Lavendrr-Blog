import React from 'react'
import GoogleLogin from 'react-google-login'
import { useDispatch, useSelector } from 'react-redux';
import { selectSignedIn, setSignedIn, setUserData } from '../features/userSlice';

const HomePage = () => {

     const dispatch = useDispatch();

    const login = (response) => {
        console.log(response);
        dispatch(setSignedIn(true));
        dispatch(setUserData(response.profileObj));
    }

    const isSignedIn = useSelector(selectSignedIn)
    console.log(isSignedIn);

    return (
        <div className='home_page' style={{ display: isSignedIn ? 'none' : 'block' }}>
            {!isSignedIn &&
                <div className="container home_message text-center">
                    <h1>Your favourite place <br /> to read</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A nulla magnam laborum veritatis deserunt saepe aperiam unde, cumque quasi eaque commodi error laudantium vel modi possimus dicta minus, illum rem.</p>
                     
                    <GoogleLogin
                        clientId={process.env.REACT_APP_CLIENT_ID}
                        render={(renderProps) => (
                            <button onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                className='btn btn_login'
                            >
                                Login with Google
                            </button>
                        )}
                        onSuccess={login}
                        onFailure={login}
                        isSignedIn={true}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
                 
            }
        </div>
    )
}

export default HomePage
