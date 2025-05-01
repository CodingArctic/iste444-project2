import React, { useState } from 'react';
import { useContent } from '../utils/ContentProvider';
import Login from '../pages/Login';

const Nav = () => {
    const { setContent } = useContent();

    const [loggedIn, setLoggedIn] = useState(false); // Replace with actual authentication logic

    const handleLogin = () => {
        setLoggedIn(!loggedIn);
        // setContent(<Login/>);
    }

    return (
        <div className='nav'>
            <h1 className='nav-title'>CarMart</h1>
            <button onClick={handleLogin} className='login-btn'>{loggedIn ? 'Logout' : 'Login'}</button>
        </div>
    );
};

export default Nav;
