import React from 'react';
import { apiRequest } from '../utils/apiRequest';
import './Card.css';

const Card = ({ car, isOwn = false, onDelete }) => {
    // Format mileage
    const formattedMileage = new Intl.NumberFormat('en-US').format(car.mileage);

    // Format price in USD
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0, // No cents
    }).format(car.price);

    const handleEdit = () => {
        // Logic to handle editing the car listing
        console.log(`Editing car with VIN: ${car.vin}`);
    }

    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete the car with VIN: ${car.vin}?`)) {
            try {
                await apiRequest(`/api/car/${car.vin}`, 'DELETE');
                console.log(`Car with VIN: ${car.vin} deleted successfully.`);
                if (onDelete) {
                    onDelete(car.vin); // Pass up to parent
                }
            } catch (err) {
                console.error('Error deleting car:', err);
                alert('An error occurred while deleting the car.');
            }
        }
    };

    const handleBuy = () => {
        // Logic to handle buying the car
        console.log(`Buying car with VIN: ${car.vin}`);
    }

    return (
        <div className='card'>
            <h3 className='card-title'>{car.make} {car.model}</h3>
            <ul className='card-details'>
                <li>Year: {car.year}</li>
                <li>Mileage: {formattedMileage}</li>
            </ul>
            {isOwn ? (
                <div className='card-buttons'>
                    <button onClick={handleEdit} className='card-button outline-btn'>Edit</button>
                    <button onClick={handleDelete} className='card-button delete'>Delete</button>
                </div>
            ) : (
                <button onClick={handleBuy} className='card-button'>{formattedPrice}</button>
            )}
        </div>
    );
};

export default Card;
