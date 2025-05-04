import React, { useState, useEffect } from 'react'
import { useContent } from '../utils/ContentProvider';
import Card from '../components/Card'
import './Home.css'

const MyListings = () => {
    const { userId } = useContent();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/cars/${userId}`, );
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

    const handleAdd = () => {
        // open modal to create a new car
    }

    const handleDelete = (vin) => {
        setCars((prevCars) => prevCars.filter((car) => car.vin !== vin));
    };

	return (
        <div className='home-container'>
            <h2 className='home-title'>My Listings</h2>
            <p className='home-description'>The cars you have listed on the marketplace. You can view, edit, or delete them.</p>
            <button className='add-car-btn' onClick={handleAdd}>Add Car</button>
            <div className='home-cards'>
                {loading ? (
                    <p>Loading...</p>
                ) : cars.length === 0 ? (
                    <p>You don't have any cars listed.</p>
                ) : (
                    <>
                        {cars.map((car, index) => (
                            <Card key={index} car={car} isOwn onDelete={handleDelete} />
                        ))}
                    </>
                )}
            </div>
        </div>
	)
}

export default MyListings
