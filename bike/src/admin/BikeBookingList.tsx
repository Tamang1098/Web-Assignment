import React, { useEffect, useState } from 'react';
import './BIkeBookingList.css';
import axios from 'axios';

interface Booking {
    id: number; // Ensure there's an ID property for each booking
    bikeId: string;
    userId: string;
    totalAmount: string;
    rentalStartdateTime: string;
    rentalEnddateTime: string;
}

const BikeBookingList: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchBookingsWithDetails();
    }, []);

    const fetchBookingsWithDetails = async () => {
        try {
            const response = await fetch('http://localhost:8080/bike/rentals'); // Adjust URL if needed
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Check if the response is HTML
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('text/html')) {
                const text = await response.text();
                throw new Error(`Expected JSON but received HTML: ${text}`);
            }

            const data: Booking[] = await response.json();
            setBookings(data);
        } catch (error) {
            console.error('Error fetching bookings with details:', error);
            setError('Failed to fetch bookings with details.');
        }
    };

    const handleDelete = async (id: number) => { // Ensure id is the correct parameter
        try {
            await axios.delete(`http://localhost:8080/bike/rentals/${id}`); // Use id in URL
            const updatedBookings = bookings.filter(booking => booking.id !== id);
            setBookings(updatedBookings);
        } catch (error) {
            console.error('Error deleting booking:', error);
            setError('Error deleting booking. Please try again later.');
        }
    };

    return (
        <div className="booking-list-container">
            {error && <p className="error-message">{error}</p>}
            <table className="booking-list-table">
                <thead>
                <tr>
                    <th>Bike Id</th>
                    <th>User Id</th>
                    <th>Total Amount</th>
                    <th>Rental Start Date</th>
                    <th>Rental End Date</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {bookings.map((booking) => (
                    <tr key={booking.id}> {/* Use booking.id as the key */}
                        <td>{booking.bikeId}</td>
                        <td>{booking.userId}</td>
                        <td>{booking.totalAmount}</td>
                        <td>{booking.rentalStartdateTime}</td>
                        <td>{booking.rentalEnddateTime}</td>
                        <td>
                            <button
                                className="delete-button"
                                onClick={() => handleDelete(booking.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default BikeBookingList;
