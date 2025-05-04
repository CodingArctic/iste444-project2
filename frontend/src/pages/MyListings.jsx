import React, { useState, useEffect } from 'react'
import { useContent } from '../utils/ContentProvider';
import { apiRequest } from '../utils/apiRequest';
import Login from './Login';
import Card from '../components/Card'
import './Home.css'

const MyListings = () => {
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
                setCars([]);
                setLoading(false);
                console.error('Error fetching cars:', err);
            }
        };

        if (userId) {
            fetchCars();
        }
    }, [userId]);

    const handleAdd = () => {
        // open modal to create a new car
    }

    const handleDelete = (vin) => {
        setCars((prevCars) => prevCars.filter((car) => car.vin !== vin));
    };

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
