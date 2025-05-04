import React, { useState, useEffect } from 'react'
import { useContent } from '../utils/ContentProvider';
import { apiRequest } from '../utils/apiRequest';
import Login from './Login';
import Card from '../components/Card'
import './Home.css'
import CarDialog from '../components/CarDialog';

const MyListings = () => {
    const { setContent, userId } = useContent();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const data = await apiRequest(`/api/cars/${userId}`, 'GET');
                setCars(data);
                setLoading(false); 
            } catch (err) {
                setCars([]);
                setLoading(false);
            }
        };

        if (userId) {
            fetchCars();
        }
    }, [userId]);

    const handleAdd = () => {
        setIsDialogOpen(true);
    }

    const handleDelete = (vin) => {
        setCars((prevCars) => prevCars.filter((car) => car.vin !== vin));
    };

    const handleUpdate = (updatedCar) => {
        setCars((prevCars) =>
            prevCars.map((car) => (car.vin === updatedCar.vin ? updatedCar : car))
        );
    };

    const handleLogin = () => {
        setContent('login', <Login />);
    }

    const handleDialogSubmit = async (formData) => {
        try {
            await apiRequest('/api/cars', 'POST', formData);
            setCars((prevCars) => [...prevCars, formData]);
            setIsDialogOpen(false);
        } catch (err) {
            console.error('Error adding car:', err);
        }
    };

    if (!userId) {
        return (
            <div className='home-container'>
                <h2 className='home-title'>My Listings</h2>
                <p className='home-description'>Please <button className='text-btn' onClick={handleLogin}>login</button> to view your listings.</p>
            </div>
        );
    }

	return (
        <>
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
                        <Card key={index} car={car} isOwn onDelete={handleDelete} onUpdate={handleUpdate} />
                    ))}
                    </>
                )}
            </div>
        </div>
        <CarDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            onSubmit={handleDialogSubmit}
        />
        </>
	)
}

export default MyListings
