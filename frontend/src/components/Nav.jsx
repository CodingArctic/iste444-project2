import React, { useEffect, useState } from 'react';
import { useContent } from '../utils/ContentProvider';
import Login from '../pages/Login';
import Home from '../pages/Home';
import './Nav.css';

const Nav = () => {
    const { state, setContent } = useContent();
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        // setLoggedIn(!loggedIn);
        setContent('login', <Login />);
    }

    const handleHome = () => {
        setContent('home', <Home />);
    }

    return (
        <div className='nav-container'>
            <div className='nav'>
                <h1 onClick={handleHome} className='nav-title'>CarMart</h1>
                {state.name !== 'login' && <button onClick={handleLogin} className='outline-btn'>{loggedIn ? 'Logout' : 'Login'}</button>}
            </div>
        </div>
    );
};

export default Nav;
