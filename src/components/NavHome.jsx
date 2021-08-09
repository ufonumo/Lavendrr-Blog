import React , {useState} from 'react';
import { Navbar , Container , Nav , Form, FormControl , Button } from 'react-bootstrap'
import { selectSignedIn, selectUserData , setInput, setSignedIn, setUserData } from '../features/userSlice';
import {  useSelector, useDispatch } from 'react-redux';
import { GoogleLogout } from 'react-google-login';
import { Avatar } from '@material-ui/core';


const NavHome = () => {
    const isSignedIn = useSelector(selectSignedIn);
    const [inputValue, setInputValue] = useState('');
    const userData = useSelector(selectUserData);

    const dispatch = useDispatch()

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(setInput(inputValue))
        setInputValue('')
    }

    const logout = (response) => {
        dispatch(setUserData(null));
        dispatch(setSignedIn(false))
    }

    return (
        <>
            <Navbar bg="dark" expand="lg" variant='dark'>
                <Container>
                    <Navbar.Brand href="#home">Lavender Blog</Navbar.Brand>
                    { isSignedIn ? 
                        <>
                         <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="#home">Home</Nav.Link>
                                    <Form className="d-flex">
                                        <FormControl
                                            type="search"
                                            placeholder={inputValue}
                                            className="mr-2"
                                            aria-label="Search"
                                            onChange={(e) => setInputValue(e.target.value)}
                                            value={inputValue}
                                        />
                                        <Button onClick={handleClick} variant="outline-success">Search</Button>
                                    </Form>
                                </Nav>
                                <Nav className='ms-auto'>
                                    <div className="avatar">
                                        < Avatar src={userData?.imageUrl} alt={userData?.name} className='avatar' />
                                        <small className='text-white me-4 mt-2 ms-2'>{userData?.givenName}</small>
                                    </div>
                                    <GoogleLogout clientId={process.env.REACT_APP_CLIENT_ID}
                                        render={(renderProps) => (
                                            <button onClick={renderProps.onClick}
                                                disabled={renderProps.disabled}
                                                className='btn btn_login'
                                            >
                                                logout 
                                            </button>
                                        )}
                                        onLogoutSuccess={logout}
                                    />
                                </Nav>
                            </Navbar.Collapse>
                        </>
                        : 
                            <>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className='ms-auto'>
                                        <h5 className='text-white'>User not available 😞</h5>   
                                    </Nav>
                                </Navbar.Collapse>                            
                            </>
                            }
                   
                </Container>
            </Navbar>
        </>
    )
}

export default NavHome
