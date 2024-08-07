import React, { useState } from 'react';
import '../Modal.css'; // Add your styles

const StatusModal = ({ isOpen, onClose, item, updateStatus, type }) => {
    const [newStatus, setNewStatus] = useState(item.status);

    const handleStatusChange = (e) => {
        setNewStatus(e.target.value);
    };

    const handleUpdateStatus = () => {
        updateStatus(item.id, newStatus);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Update Status</h2>
                <select value={newStatus} onChange={handleStatusChange}>
                    <option value="rejected">Rejected</option>
                    <option value="under_investigation">Under Investigation</option>
                    <option value="resolved">Resolved</option>
                </select>
                <button onClick={handleUpdateStatus}>Update</button>
            </div>
        </div>
    );
};

export default StatusModal;