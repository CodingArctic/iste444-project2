import React from 'react';
import './Card.css';

const Card = ({ car, isOwn = false }) => {
    return (
        <div className='card'>
            <h3 className='card-title'>{car.info}</h3>
            <ul className='card-details'>
                <li>Make</li>
                <li>Model</li>
                <li>Year</li>
                <li>Mileage</li>
            </ul>
            {isOwn ? (
                <div className='card-buttons'>
                    <button className='card-button outline-btn'>Edit</button>
                    <button className='card-button delete'>Delete</button>
                </div>
            ) : (
                <button className='card-button'>Price</button>
            )}
        </div>
    );
};

export default Card;
