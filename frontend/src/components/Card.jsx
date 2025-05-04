import React, { useState } from 'react';
import { apiRequest } from '../utils/apiRequest';
import CarDialog from './CarDialog';
import './Card.css';

const Card = ({ car, isOwn = false, onDelete, onUpdate }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    // Format mileage
    const formattedMileage = new Intl.NumberFormat('en-US').format(car.mileage);

    // Format price in USD
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0, // No cents
    }).format(car.price);

    const handleEdit = () => {
        setIsDialogOpen(true);
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

    const handleBuy = async () => {
        if (window.confirm(`Are you sure you want to buy this ${car.year} ${car.make} ${car.model}?`)) {
            try {
                await apiRequest(`/api/car/${car.vin}`, 'DELETE');
                console.log(`Car with VIN: ${car.vin} purchased successfully.`);
                if (onDelete) {
                    onDelete(car.vin); // Notify parent to remove car from list
                }
            } catch (err) {
                console.error('Error buying car:', err);
                alert('An error occurred while buying the car.');
            }
        }
    }

    const handleDialogSubmit = async (formData) => {
        try {
            await apiRequest(`/api/cars`, 'PUT', formData);
            setIsDialogOpen(false);
            if (onUpdate) {
                onUpdate(formData); // Notify parent to update car details
            }
        } catch (err) {
            console.error('Error updating car:', err);
            alert('An error occurred while updating the car.');
        }
    };

    return (
        <>
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
        <CarDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            onSubmit={handleDialogSubmit}
            initialData={car}
        />
        </>
    );
};

export default Card;
