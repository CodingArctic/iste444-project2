import React, { useEffect, useState } from 'react';
import { useContent } from '../utils/ContentProvider';
import { apiRequest } from '../utils/apiRequest';
import Login from './Login';
import Card from '../components/Card';
import './Home.css';

const Home = () => {
    const { setContent, userId } = useContent();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const data = await apiRequest(`/api/cars/${userId}`, 'GET');
                setCars(data);
                setLoading(false); 
            } catch (err) {
                console.error('Error fetching cars:', err);
            }
        };

        if (userId) {
            fetchCars();
        }
    }, [userId]);

    const handleLogin = () => {
        setContent('login', <Login />);
    }

    if (!userId) {
        return (
            <div className='home-container'>
                <h2 className='home-title'>My Listings</h2>
                <p className='home-description'>Please <button className='text-btn' onClick={handleLogin}>login</button> to view your listings.</p>
            </div>
        );
    }
    
    return (
        <div className='home-container'>
            <h2 className='home-title'>Car Marketplace</h2>
            <p className='home-description'>Online marketplace where you can browse and get detailed information on vehicles.</p>
            <div className='home-cards'>
                {loading ? (
                    <p>Loading...</p>
                ) : cars.length === 0 ? (
                    <p>No cars available.</p>
                ) : (
                    <>
                        {cars.map((car, index) => (
                            <Card key={index} car={car} />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
