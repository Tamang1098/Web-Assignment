
import React, { useState } from 'react';
import axios from 'axios';
import './AddBike.css';

interface AddBikeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddBikeModal: React.FC<AddBikeModalProps> = ({ isOpen, onClose }) => {
    const [bikeBrand, setBikeBrand] = useState('');
    const [seat, setSeat] = useState<number | ''>('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('bikeBrand', bikeBrand);
        formData.append('seat', String(seat));
        formData.append('price', price);
        if (image) {
            formData.append('bikeImage', image);
        }

        try {
            const response = await axios.post('http://localhost:8080/bikes/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setShowPopup(true); // Show success popup
            setTimeout(() => {
                setShowPopup(false);
                onClose(); // Close the modal after hiding the popup
            }, 2000); // Hide popup after 3 seconds
        } catch (error) {
            console.error('Error adding bike:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>×</button>
                <h2>Add New Bike</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="bikeBrand">Bike Brand:</label>
                        <input
                            type="text"
                            id="bikeBrand"
                            value={bikeBrand}
                            onChange={(e) => setBikeBrand(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="seat">Seat:</label>
                        <input
                            type="number"
                            id="seat"
                            value={seat}
                            onChange={(e) => setSeat(Number(e.target.value))}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input
                            type="text"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Bike Image:</label>
                        <input
                            type="file"
                            id="image"
                            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Add Bike</button>
                </form>
            </div>
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <p>Bike added successfully!</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddBikeModal;
