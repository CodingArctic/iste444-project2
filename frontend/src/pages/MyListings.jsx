import { useState } from 'react'
import Card from '../components/Card'
import './Home.css'

const MyListings = () => {

	return (
        <div className='home-container'>
            <h2 className='home-title'>My Listings</h2>
            <p className='home-description'>The cars you have listed on the marketplace. You can view, edit, or delete them.</p>
            <div className='home-cards'>
                {/* map cards out */}
                <Card isOwn />
                <Card isOwn />
            </div>
        </div>
	)
}

export default MyListings
