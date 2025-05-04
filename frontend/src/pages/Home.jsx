import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import './Home.css';

const Home = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/cars');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched cars:', data);
                setCars(data);
                setLoading(false); 
            } catch (err) {
                console.error('Error fetching cars:', err);
            }
        };

        fetchCars();
    }, []);
    
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
