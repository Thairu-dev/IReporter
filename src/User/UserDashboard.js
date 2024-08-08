import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "../Spinner.css";
import UserRedflagsmap from './UserRedFlagsMap'; // Import the map component

const UserDashboard = () => {
    const { logout } = useAuth();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

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

    const handleLogout = () => {
        logout();
        navigate('/login');  // Redirect to login after logout
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

    return (
        <div>
            <h2>Welcome, {userData?.name || 'User'}</h2>
            <button onClick={handleLogout}>Logout</button>
            {(userData?.intervention?.length > 0 || userData?.redflags?.length > 0) ? (
                <div>
                    <h3>Map</h3>
                    <UserRedflagsmap
                        interventions={userData.intervention} 
                        redflags={userData.redflags}
                    />
                </div>
            ) : (
                <p>No interventions or redflags available.</p>
            )}
        </div>
    );
};

export default UserDashboard;
