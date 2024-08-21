import React from 'react';
import './homepage.css';
import userfriendly from "./assets/user.jpg";
import main from "./assets/HONDA-BIKE.png";
import system from "./assets/crf.png";
import transparent from "./assets/Transparent_pricing.jpg";
import selection from "./assets/wide_vehicle_selection.jpg";
import flexible from "./assets/Flexible_booking.jpg";
import easy from "./assets/easy_to_rent.jpg";import honda from "./assets/Honda-Logo.jpg";
import suzuki from "./assets/Suzuki-Logo.jpg";
import vr from "./assets/Hartford-Logo-VR.jpg";
import yamaha from "./assets/Yamaha-Logo.jpg";

const HomePage: React.FC = () => {
    return (
        <div className="home-body">

            <main className="home-main">
                <div className="home-hero" style={{background: `url(${main}) no-repeat center center/cover`}}>
                   
                </div>
            </main>

            <div className="home-background" style={{background: `url(${system}) no-repeat center center/cover`}}>
                <div className="home-content">
                    <div className="home-main-heading">Why Choose Our Vehicle Rental System?</div>

                    <div className="home-section home-user-friendly">
                        <img src={userfriendly} alt="User Friendly" className="home-icon"/>
                        <div className="home-text-content">
                            <div className="home-sub-heading">User-Friendly Interface</div>
                            <p>Our system is easy to navigate, making the rental process smooth and efficient.</p>
                        </div>
                    </div>

                    <div className="home-section home-transparent-pricing">
                        <img src={transparent} alt="Transparent Pricing" className="home-icon"/>
                        <div className="home-text-content">
                            <div className="home-sub-heading">Transparent Pricing</div>
                            <p>No hidden fees. Know exactly what you are paying for.</p>
                        </div>
                    </div>

                    <div className="home-section home-wide-selection">
                        <img src={selection} alt="Wide Selection" className="home-icon"/>
                        <div className="home-text-content">
                            <div className="home-sub-heading">Wide Selection</div>
                            <p>Choose from a variety of vehicles to suit your needs.</p>
                        </div>
                    </div>

                    <div className="home-section home-flexible-booking">
                        <img src={flexible} alt="Flexible Booking" className="home-icon"/>
                        <div className="home-text-content">
                            <div className="home-sub-heading">Flexible Booking Options</div>
                            <p>Book at your convenience with our flexible booking options.</p>
                        </div>
                    </div>

                    <div className="home-section home-easy-to-rent">
                        <img src={easy} alt="Easy to Rent" className="home-icon"/>
                        <div className="home-text-content">
                            <div className="home-sub-heading">Easy to Rent</div>
                            <p>Renting a vehicle has never been easier with our streamlined process.</p>
                        </div>
                    </div>
                </div>
            </div>

           
        </div>
    );
};

export default HomePage;











