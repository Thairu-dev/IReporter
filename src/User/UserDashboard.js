import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "../Spinner.css"

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
    <div>
        <h3>Interventions</h3>
        <ul>
            {userData?.intervention?.length > 0 ? (
                userData.intervention.map((interv) => (
                    <li key={interv.id}>
                        <h4>{interv.intervention}</h4>
                        <p>{interv.description}</p>
                        <p>Status: {interv.status}</p>
                        <p>Geolocation: {interv.geolocation}</p>
                        <p>Date Added: {interv.date_added}</p>
                    </li>
                ))
            ) : (
                <p>No interventions available.</p>
            )}
        </ul>
        </div>
        <div>
            <h3>Redflags</h3>
            <ul>
                {userData?.redflags?.length > 0 ? (
                    userData.redflags.map((redflg) => (
                        <li key={redflg.id}>
                            <h4>{redflg.redflag}</h4>
                            <p>{redflg.description}</p>
                            <p>Status: {redflg.status}</p>
                            <p>Geolocation: {redflg.geolocation}</p>
                            <p>Date Added: {redflg.date_added}</p>
                        </li>
                    ))
                ) : (
                    <p>No redflags available.</p>
                )}
            </ul>
        </div>
    </div>
    );
};

export default UserDashboard;