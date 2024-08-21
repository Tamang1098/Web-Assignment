import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BikeList.css';
import AddBikeModal from './AddBike'; // Adjust the path according to your file structure
import EditBikeModal from './EditBike'; // Adjust the path according to your file structure

interface Bike {
    id: number;
    bikeBrand: string;
    seat: number;
    price: string;
    bikeImage: string;
}

const BikeList: React.FC = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedBikeIndex, setSelectedBikeIndex] = useState<number | null>(null);
    const [bikes, setBikes] = useState<Bike[]>([]); // Define state for bikes

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

    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => setIsAddModalOpen(false);
    const openEditModal = (index: number) => {
        setSelectedBikeIndex(index);
        setIsEditModalOpen(true);
    };
    const closeEditModal = () => setIsEditModalOpen(false);

    const handleEditSave = (updatedBike: Bike) => {
        if (selectedBikeIndex !== null) {
            const updatedBikes = [...bikes];
            updatedBikes[selectedBikeIndex] = updatedBike;
            setBikes(updatedBikes);
        }
    };

    const handleDelete = async (index: number) => {
        const bikeToDelete = bikes[index];
        try {
            await axios.delete(`http://localhost:8080/bikes/addlist/${bikeToDelete.id}`);
            const updatedBikes = bikes.filter((_, i) => i !== index);
            setBikes(updatedBikes);
        } catch (error) {
            console.error('Error deleting bike:', error);
        }
    };

    return (
        <div className="bike-list-container">
            <button className="add-bike-button" onClick={openAddModal}>Add Bike</button>
            <table className="bike-list-table">
                <thead>
                <tr>
                    <th>Bike Image</th>
                    <th>Bike Brand</th>
                    <th>Seat</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {bikes.map((bike, index) => (
                    <tr key={bike.id}>
                        <td>

                            <img src={`data:image/jpeg;base64,${bike.bikeImage}`} alt={`Bike ${index}`} className="bike-image" />
                        </td>
                        <td>{bike.bikeBrand}</td>
                        <td>{bike.seat}</td>
                        <td>{bike.price}</td>
                        <td>
                            <button className="action-button edit-button" onClick={() => openEditModal(index)}>Edit</button>
                            <button className="action-button delete-button" onClick={() => handleDelete(index)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <AddBikeModal isOpen={isAddModalOpen} onClose={closeAddModal} />
            {selectedBikeIndex !== null && (
                <EditBikeModal
                    isOpen={isEditModalOpen}
                    onClose={closeEditModal}
                    bike={bikes[selectedBikeIndex]}
                    onSave={handleEditSave}
                />
            )}
        </div>
    );
};

export default BikeList;