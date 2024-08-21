import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditBike.css';

interface EditBikeModalProps {
    isOpen: boolean;
    onClose: () => void;
    bike: { id: number; bikeBrand: string; seat: number; price: string; bikeImage: string } | null;
    onSave: (updatedBike: { id: number; bikeBrand: string; seat: number; price: string; bikeImage: string }) => void;
}

const EditBikeModal: React.FC<EditBikeModalProps> = ({ isOpen, onClose, bike, onSave }) => {
    const [bikeBrand, setBikeBrand] = useState('');
    const [seat, setSeat] = useState<number | ''>('');
    const [price, setPrice] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        if (bike) {
            setBikeBrand(bike.bikeBrand);
            setSeat(bike.seat);
            setPrice(bike.price);
        }
    }, [bike]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setImageFile(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (bike) {
            try {
                const formData = new FormData();
                formData.append('bikeBrand', bikeBrand);
                formData.append('seat', seat.toString());
                formData.append('price', price);

                // Append the image file if it was selected
                if (imageFile) {
                    formData.append('bikeImage', imageFile);
                }

                // Make the PUT request to update the bike
                const response = await axios.put(`http://localhost:8080/bikes/bike/${bike.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log('Response:', response);

                // Update the bike object and pass it back via onSave
                const updatedBike = {
                    ...bike,
                    bikeBrand,
                    seat,
                    price,
                    bikeImage: imageFile ? URL.createObjectURL(imageFile) : bike.bikeImage,
                };

                onSave(updatedBike);
                onClose();
            } catch (error) {
                console.error('Error updating bike:', error.response?.data || error.message);
            }
        }
    };

    if (!isOpen || !bike) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>×</button>
                <h2>Edit Bike</h2>
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
                            onChange={handleFileChange}
                        />
                    </div>
                    <button type="submit" className="submit-button">Save Changes</button>
                </form>
            </div>
        </div>
    );
};

export default EditBikeModal;

