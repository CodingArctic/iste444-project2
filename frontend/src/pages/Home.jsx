import React from 'react';
import Card from '../components/Card';
import './Home.css';

const Home = () => {
    return (
        <div className='home-container'>
            <h2 className='home-title'>Car Marketplace</h2>
            <p className='home-description'>Online marketplace where you can browse and get detailed information on vehicles.</p>
            <div className='home-cards'>
                {/* map cards out */}
                <Card />
                <Card />
            </div>
        </div>
    );
};

export default Home;
