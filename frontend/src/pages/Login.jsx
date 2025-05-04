import React, { useState } from 'react';
import { useContent } from '../utils/ContentProvider';
import { apiRequest } from '../utils/apiRequest';
import Home from './Home';
import './Login.css';

const Login = () => {
    const { setContent, setUserId } = useContent();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setError('');

        if (!username || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const data = await apiRequest('/api/login', 'POST', { username, password });
            localStorage.setItem('userId', data.id);
            setUserId(data.id);
            setContent('home', <Home />);
        } catch (err) {
            console.error('Error during login:', err);
            if (err.message.includes('404')) {
                setError('Invalid username or password');
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    }

    return (
        <div className='login-container'>
            <div className='login-box'>
                <h1 className='login-title'>Login Portal</h1>
                <div className='sign-in'>
                    {error && <div className='error-msg'>{error}</div>}
                    <form className='login-section' onSubmit={handleSubmit}>
                        <div className='input-container'>
                            <label className='input-label' htmlFor="username">Username</label>
                            <input
                                className='input-field'
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className='input-container'>
                            <label className='input-label' htmlFor="password">Password</label>
                            <input
                                className='input-field'
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit">Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
