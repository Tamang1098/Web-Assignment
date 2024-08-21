import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BikeCard from './BikeCard'; // Adjust the path according to your file structure
import './BikeAll.css'; // Ensure you create and style this CSS file accordingly

interface Bike {
    id: number;
    bikeBrand: string;
    seat: number;
    price: string;
    bikeImage: string;
}

const BikeAll: React.FC = () => {

    const [bikes, setBikes] = useState<Bike[]>([]);

    useEffect(() => {
        const fetchBikes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/bikes/addlist');
                setBikes(response.data);
            } catch (error) {
                console.error('Error fetching bikes:', error);
            }
        };

        fetchBikes();
    }, []);

    const handleBook = (bikeId: number) => {
        // Implement booking logic here
        console.log(`Bike ${bikeId} booked`);
    };

    return (
        <div className="bike-all-container">
            <h1>Bikes Available in Kathmandu</h1>
            <div className="bike-list">
                {bikes.map((bike) => (
                    <BikeCard key={bike.id} bike={bike} onBook={handleBook} />
                ))}
            </div>
        </div>
    );
};

export default BikeAll;
