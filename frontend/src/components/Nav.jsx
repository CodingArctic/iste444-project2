import React, { useEffect, useState } from 'react';
import { useContent } from '../utils/ContentProvider';
import Login from '../pages/Login';
import Home from '../pages/Home';
import './Nav.css';
import MyListings from '../pages/MyListings';

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

    const handleMyListings = () => {
        setContent('about', <MyListings />);
    }

    return (
        <div className='nav-container'>
            <div className='nav'>
                <div className='nav-left'>
                    <h1 onClick={handleHome} className='nav-title'>CarMart</h1>
                    <ul className='nav-items'>
                        <li onClick={handleHome} className={`nav-item ${state.name === 'home' ? 'active' : ''}`}>Home</li>
                        <li onClick={handleMyListings} className={`nav-item ${state.name === 'about' ? 'active' : ''}`}>My Listings</li>
                    </ul>
                </div>
                {state.name !== 'login' && <button onClick={handleLogin} className='outline-btn'>{loggedIn ? 'Logout' : 'Login'}</button>}
            </div>
        </div>
    );
};

export default Nav;
