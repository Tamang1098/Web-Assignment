import React from 'react';
import './BikeRental.css';
import {Link} from "react-router-dom";
import vr from "./assets/VR-BIKE.png";

import loc from "./assets/location.jpg";
import use from "./assets/user.jpg";

const BikeRental: React.FC = () => {
    return (
        <div className="bikerental-body">
            <header className="bikerental-header">
                <h1>Rent Vehicle</h1>
                <div className="bikerental-filters">
                    <div className="bikerental-dropdown">
                        <label htmlFor="vehicle-type">Vehicle Type</label>
                        <select id="vehicle-type">
                            <option value="bike">Bike</option>
                            <option value="car">Car</option>
                        </select>
                    </div>
                    <div className="bikerental-dropdown">
                        <label htmlFor="vehicle-brand">Brand</label>
                        <select id="vehicle-brand">
                            <option value="ALL">ALL</option>
                            <option value="SUZUKI">SUZUKI</option>
                            <option value="HONDA">HONDA</option>
                            <option value="YAMAHA">YAMAHA</option>
                            <option value="HARTFORD-VR">HARTFORD-VR</option>
                        </select>
                    </div>
                    <div className="bikerental-dropdown">
                        <label htmlFor="price-filter">Price</label>
                        <select id="price-filter">
                            <option value="100-300">$100-$300</option>
                            <option value="301-500">$301-$500</option>
                            <option value="501-800">$501-$800</option>
                            <option value="801-1000">$801-$1000</option>
                        </select>
                    </div>
                </div>
            </header>

            <div className="bikerental-vehicle-grid">
                {vehicleData.map((vehicle, index) => (
                    <div key={index} className="bikerental-vehicle-card">
                        <p>{vehicle.brand}</p>
                        <div className="bikerental-image-container">
                            <img src={vr}alt={`Vehicle Image ${index + 1}`} />,
                        </div>
                        <div className="bikerental-info-container">
                            <div className="bikerental-location">
                                <img src={loc} alt="Location Icon" />
                                <span>{vehicle.location}</span>
                            </div>
                            <div className="bikerental-seats">
                                <img src={use}alt="User Icon" />
                                <span>{vehicle.seats} Seats</span>
                            </div>
                            <div className="bikerental-price-section">
                                <div className="bikerental-price">
                                    <span className="bikerental-estimate">Estimated Price</span>
                                    <span className="bikerental-amount">{vehicle.price}/day</span>
                                </div>
                                <div className="bike-book-button">
                                <Link to='/bikebooking'><button>Book</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            
        </div>
    );
};

const vehicleData = [
    { brand: 'SUZUKI', image: 'SUZUKI-BIKE.png', location: 'Kathmandu', seats: 2, price: '$950' },
    { brand: 'SUZUKI', image: 'SUZUKI-BIKE.png', location: 'Kathmandu', seats: 2, price: '$950' },
    { brand: 'HONDA', image: 'HONDA-BIKE.png', location: 'Kathmandu', seats: 2, price: '$750' },
    { brand: 'HONDA', image: 'HONDA-BIKE.png', location: 'Kathmandu', seats: 2, price: '$750' },
    { brand: 'YAMAHA', image: 'YAMAHA-BIKE.png', location: 'Kathmandu', seats: 2, price: '$350' },
    { brand: 'YAMAHA', image: 'YAMAHA-BIKE.png', location: 'Kathmandu', seats: 2, price: '$350' },
    { brand: 'HARTFORD-VR', image: 'VR-BIKE.png', location: 'Kathmandu', seats: 2, price: '$200' },
    { brand: 'HARTFORD-VR', image: 'VR-BIKE.png', location: 'Kathmandu', seats: 2, price: '$200' },
];

export default BikeRental;
