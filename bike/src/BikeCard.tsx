import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BikeCard.css';

interface Bike {
    id: number;
    bikeBrand: string;
    seat: number;
    price: string;
    bikeImage: string;
    isBooked: boolean; // Add a new field to track booking status
    rentalEndDateTime: string | null; // Add a field for rental end time
}

interface BikeCardProps {
    bike: Bike;
}

const BikeCard: React.FC<BikeCardProps> = ({ bike }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
    const [isBooked, setIsBooked] = useState(bike.isBooked); // Track booking status
    const navigate = useNavigate();

    useEffect(() => {
        if (bike.rentalEndDateTime) {
            const endDate = new Date(bike.rentalEndDateTime);
            const now = new Date();
            if (now > endDate) {
                setIsBooked(false); // Mark the bike as available if the rental period has ended
            }
        }
    }, [bike.rentalEndDateTime]);

    const handleCalculateAmount = () => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
            const amount = days * parseFloat(bike.price);
            setTotalAmount(amount);
        }
    };

    const handleBookClick = () => {
        const isLoggedIn = localStorage.getItem('userId');

        if (!isLoggedIn) {
            setShowPopup(true);
        } else {
            handleOpenBookingPopup();
        }
    };

    const handleOpenBookingPopup = () => {
        setShowPopup(true);
    };

    const handleConfirmBooking = async () => {
        const userId = localStorage.getItem('userId');
        if (startDate && endDate && userId) {
            const bookingData = {
                bikeId: bike.id.toString(),
                userId: userId,
                rentalStartdateTime: startDate,
                rentalEnddateTime: endDate,
                totalAmount: totalAmount.toString(),
            };

            try {
                const response = await fetch('http://localhost:8080/bike/bikebooking', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(bookingData),
                });

                if (response.ok) {
                    alert('Bike booked successfully!');
                    setIsBooked(true); // Update the booking status
                } else {
                    alert('Failed to book the bike.');
                }
            } catch (error) {
                console.error('Error booking bike:', error);
                alert('An error occurred while booking the bike.');
            }

            setShowPopup(false);
        }
    };

    const handleRedirectToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="bike-card">
            <img src={`data:image/jpeg;base64,${bike.bikeImage}`} alt={`Bike ${bike.id}`} className="bike-image"/>
            <h2 className="bike-brand">{bike.bikeBrand}</h2>
            <p className="bike-seat">Seats: {bike.seat}</p>
            <p className="bike-price">Price: {bike.price}</p>

            {isBooked ? (
                <button className="booked-button" disabled>Booked</button>
            ) : (
                <button className="book-button" onClick={handleBookClick}>Book</button>
            )}

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        {localStorage.getItem('userId') ? (
                            <>
                                <h3>Book {bike.bikeBrand}</h3>
                                <label>
                                    Start Date:
                                    <input
                                        type="datetime-local"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </label>
                                <label>
                                    End Date:
                                    <input
                                        type="datetime-local"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        onBlur={handleCalculateAmount}
                                    />
                                </label>
                                {totalAmount > 0 && (
                                    <p>Total Amount: {totalAmount.toFixed(2)}</p>
                                )}
                                <button onClick={handleConfirmBooking}>Confirm Booking</button>
                                <button onClick={() => setShowPopup(false)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <h3>Please login first</h3>
                                <button onClick={handleRedirectToLogin}>Okay</button>
                                <button onClick={() => setShowPopup(false)}>Cancel</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BikeCard;
