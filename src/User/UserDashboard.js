import React, { useEffect, useState } from 'react';
import "../Spinner.css";
import UserRedflagsmap from './UserRedFlagsMap'; // Import the map component
import './UserDashboard.css'
const UserDashboard = () => {
    
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const [selectedType, setSelectedType] = useState('interventions'); // State to handle dropdown selection
    

    useEffect(() => {
        fetch('https://ireporter-server.onrender.com/check_session', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.id) {
                setUserData(data);
            } else {
                setError('Failed to load user data');
            }
        })
        .catch(() => setError('An error occurred'));
    }, []);

   

    if (error) {
        return <p className="error">{error}</p>;
    }

    if (!userData) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }

    // Filter based on the selected type (interventions or red flags)
    const records = selectedType === 'interventions' ? userData.intervention : userData.redflags;

    return (
        <div style={{ display: 'flex' }}>
            {/* Sidebar Section */}
            <div style={{ width: '300px', padding: '10px', backgroundColor: '#f4f4f4' }}>
                <h2>User Dashboard</h2>
                <label htmlFor="type-select">Reports</label>
                <select
                    id="type-select"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    style={{ marginBottom: '10px', width: '100%' }}
                >
                    <option value="interventions">Interventions</option>
                    <option value="redflags">Redflags</option>
                </select>
                {records.length > 0 ? (
                    <div style={{ overflowY: 'auto', maxHeight: '80vh' }}>
                        {records.map((item, index) => (
                            <div key={index} style={{ marginBottom: '10px', padding: '5px', border: '1px solid #ccc', borderRadius: '5px' }}>
                                <p><strong>Description:</strong> {item.description}</p>
                                <p><strong>Date:</strong> {item.created_at}</p>
                                <p><strong>Status:</strong> <span className={`status-${item.status.toLowerCase()}`}>{item.status}</span></p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No {selectedType} available.</p>
                )}
                
            </div>
            
            {/* Map Section */}
            <div style={{ flexGrow: 1 }}>
                <UserRedflagsmap
                    interventions={selectedType === 'interventions' ? userData.intervention : []} 
                    redflags={selectedType === 'redflags' ? userData.redflags : []}
                />
            </div>
        </div>
    );
};

export default UserDashboard;


