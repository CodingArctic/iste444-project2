import React, { useState } from 'react';
import { useContent } from '../utils/ContentProvider';
import Home from './Home';
import './Login.css';

const Login = () => {
    const { setContent } = useContent();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setContent(<Home />);
    }

    return (
        <div className='login-container'>
            <div className='login-box'>
                <h1 className='login-title'>Login Portal</h1>
                <div className='sign-in'>
                    {error && <div className='error-msg'>{error}</div>}
                    <form className='login-section' onSubmit={handleSubmit}>
                        <div className='input-container'>
                            <label className='input-label' htmlFor="email">Email</label>
                            <input
                                className='input-field'
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
