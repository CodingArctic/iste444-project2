import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import './Home.css'

const MyListings = () => {
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
                } catch (err) {
                    console.error('Error fetching cars:', err);
                } finally {
                    setLoading(false); 
                }
            };
    
            fetchCars();
        }, []);

	return (
        <div className='home-container'>
            <h2 className='home-title'>My Listings</h2>
            <p className='home-description'>The cars you have listed on the marketplace. You can view, edit, or delete them.</p>
            <div className='home-cards'>
                {loading ? (
                    <p>Loading...</p>
                ) : cars.length === 0 ? (
                    <p>No cars available.</p>
                ) : (
                    <>
                        {cars.map((car, index) => (
                            <Card key={index} car={car} isOwn />
                        ))}
                    </>
                )}
            </div>
        </div>
	)
}

export default MyListings
