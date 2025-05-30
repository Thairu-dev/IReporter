import React, { useEffect, useState } from 'react';
import "../Spinner.css";
import UserRedflagsmap from './UserRedFlagsMap'; // Import the map component
import './UserDashboard.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const UserDashboard = () => {
    const [userData, setUserData] = useState(null);
    const [resolvedData, setResolvedData] = useState({ interventions: [], redflags: [] }); // State for resolved reports
    const [error, setError] = useState('');
    const [selectedType, setSelectedType] = useState('interventions'); // State to handle dropdown selection
    const navigate = useNavigate(); // Initialize useNavigate
    const location = useLocation();

    useEffect(() => {
        if (location.state?.welcomeMessage) {
            toast.success(location.state.welcomeMessage);
        }
    }, [location]);

    useEffect(() => {
        // Fetch user-specific data
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

        // Fetch all interventions
        fetch('https://ireporter-server.onrender.com/interventions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            const resolvedInterventions = data.filter(item => item.status === 'resolved');
            setResolvedData(prevState => ({ ...prevState, interventions: resolvedInterventions }));
        })
        .catch(() => setError('An error occurred while fetching interventions'));

        // Fetch all red flags
        fetch('https://ireporter-server.onrender.com/redflags', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            const resolvedRedflags = data.filter(item => item.status === 'resolved');
            setResolvedData(prevState => ({ ...prevState, redflags: resolvedRedflags }));
        })
        .catch(() => setError('An error occurred while fetching red flags'));
    }, []);

   // Function to handle item click and navigate
    const handleItemClick = (item) => {
        const typePath = selectedType === 'interventions' ? 'interventions' : 'redflags';
        navigate(`/${typePath}/${item.id}`); // Navigate to the detailed page
    };

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

    // Merge user data with resolved reports
    const userRecords = selectedType === 'interventions' ? userData.intervention : userData.redflags;
    const resolvedRecords = selectedType === 'interventions' ? resolvedData.interventions : resolvedData.redflags;

    // Merge user's records with resolved ones, ensuring no duplicates
    const records = [...userRecords, ...resolvedRecords.filter(item => !userRecords.some(userItem => userItem.id === item.id))];

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
                <ToastContainer position='top-center' autoClose={1000} />

                {records.length > 0 ? (
                    <div style={{ overflowY: 'auto', maxHeight: '80vh' }}>
                        {records.map((item, index) => (
                            <div key={index} style={{ marginBottom: '10px', padding: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
                            onClick={() => handleItemClick(item)}>
                                <p><strong>Description:</strong> {item.description}</p>
                                <p><strong>Date:</strong> {item.date_added.split(" ")[0]}</p>
                                <p><strong>Time:</strong> {item.date_added.split(" ")[1]}</p>
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
                    interventions={selectedType === 'interventions' ? records : []} 
                    redflags={selectedType === 'redflags' ? records : []}
                />
            </div>
        </div>
    );
};

export default UserDashboard;



