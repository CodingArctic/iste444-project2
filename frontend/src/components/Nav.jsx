import React, { useEffect, useState } from 'react';
import { useContent } from '../utils/ContentProvider';
import Login from '../pages/Login';
import Home from '../pages/Home';
import './Nav.css';
import MyListings from '../pages/MyListings';

const Nav = () => {
    const { state, setContent, userId, setUserId } = useContent();

    const handleLogin = () => {
        if (userId) {
            // User is logged in, handle logout
            setContent('home', <Home />);
            localStorage.removeItem('userId');
            setUserId(null);
        } else {
            // User is not logged in, handle login
            setContent('login', <Login />);
        }
    }

    const handleHome = () => {
        setContent('home', <Home />);
    }

    const handleMyListings = () => {
        setContent('myListings', <MyListings />);
    }

    return (
        <div className='nav-container'>
            <div className='nav'>
                <div className='nav-left'>
                    <h1 onClick={handleHome} className='nav-title'>CarMart</h1>
                    {state.name !== 'login' && (
                        <ul className='nav-items'>
                            <li onClick={handleHome} className={`nav-item ${state.name === 'home' ? 'active' : ''}`}>Home</li>
                            <li onClick={handleMyListings} className={`nav-item ${state.name === 'about' ? 'active' : ''}`}>My Listings</li>
                        </ul>
                    )}
                </div>
                {state.name !== 'login' && <button onClick={handleLogin} className='outline-btn'>{userId ? 'Logout' : 'Login'}</button>}
            </div>
        </div>
    );
};

export default Nav;
