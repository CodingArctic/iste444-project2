import React from 'react';
import './Card.css';

const Card = () => {
    return (
        <div className='card'>
            <h3 className='card-title'>Car Name</h3>
            <ul className='card-details'>
                <li>Make</li>
                <li>Model</li>
                <li>Year</li>
                <li>Mileage</li>
            </ul>
            <button className='card-button'>Price</button>
        </div>
    );
};

export default Card;
