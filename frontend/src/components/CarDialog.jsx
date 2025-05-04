import React, { useState, useEffect } from 'react';
import './CarDialog.css';
import { useContent } from '../utils/ContentProvider';

const CarDialog = ({ isOpen, onClose, onSubmit, initialData = {} }) => {
    const { userId } = useContent();

    const [formData, setFormData] = useState({
        ownerId: userId,
        vin: '',
        make: '',
        model: '',
        year: '',
        mileage: '',
        price: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ownerId: userId,
                vin: initialData.vin || '',
                make: initialData.make || '',
                model: initialData.model || '',
                year: initialData.year || '',
                mileage: initialData.mileage || '',
                price: initialData.price || '',
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="dialog-wrapper" onClick={onClose}>
            <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
                <h2>{initialData.vin ? 'Edit Car' : 'Add Car'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label className='input-label' htmlFor="vin">VIN</label>
                        <input
                            className='input-field'
                            type="text"
                            id="vin"
                            name="vin"
                            value={formData.vin}
                            onChange={handleChange}
                            required
                            disabled={!!initialData.vin} // Disable VIN editing for existing cars
                        />
                    </div>
                    <div className="input-container">
                        <label className='input-label' htmlFor="make">Make</label>
                        <input
                            className='input-field'
                            type="text"
                            id="make"
                            name="make"
                            value={formData.make}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label className='input-label' htmlFor="model">Model</label>
                        <input
                            className='input-field'
                            type="text"
                            id="model"
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label className='input-label' htmlFor="year">Year</label>
                        <input
                            className='input-field'
                            type="number"
                            id="year"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label className='input-label' htmlFor="mileage">Mileage</label>
                        <input
                            className='input-field'
                            type="number"
                            id="mileage"
                            name="mileage"
                            value={formData.mileage}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label className='input-label' htmlFor="price">Price</label>
                        <input
                            className='input-field'
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="dialog-buttons">
                        <button type="button" onClick={onClose} className="card-button outline-btn delete">
                            Cancel
                        </button>
                        <button type="submit" className="card-button">
                            {initialData.vin ? 'Save Changes' : 'Add Car'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CarDialog;