import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
    const { logout } = useAuth();
    const [interventions, setInterventions] = useState([]);
    const [redflags, setRedflags] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('access_token'); // Make sure you use the correct key
        fetch('https://ireporter-server.onrender.com/interventions', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(data => setInterventions(data))
        .catch(err => console.error('Error fetching interventions:', err));

        fetch('https://ireporter-server.onrender.com/redflags', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(data => setRedflags(data))
        .catch(err => console.error('Error fetching redflags:', err));
    }, []);

    const updateStatus = (entityType, entityId, newStatus) => {
        const token = localStorage.getItem('access_token');
        fetch(`https://ireporter-server.onrender.com/admin/${entityType}/${entityId}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ status: newStatus })
        })
        .then(response => response.json())
        .then(data => {
            if (entityType === 'intervention') {
                setInterventions(interventions.map(interv => interv.id === entityId ? data : interv));
            } else {
                setRedflags(redflags.map(redflag => redflag.id === entityId ? data : redflag));
            }
        })
        .catch(err => console.error('Error updating status:', err));
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <button onClick={logout}>Logout</button>
            <h2>All Interventions</h2>
            <ul>
                {interventions.map(interv => (
                    <li key={interv.id}>
                        <p><strong>Intervention:</strong> {interv.intervention}</p>
                        <p><strong>Description:</strong> {interv.description}</p>
                        <p><strong>Geolocation:</strong> {interv.geolocation}</p>
                        <p><strong>Image:</strong> {interv.image}</p>
                        <p><strong>Video:</strong> {interv.video}</p>
                        <p><strong>Status:</strong> {interv.status}</p>
                        <button onClick={() => updateStatus('intervention', interv.id, 'resolved')}>Resolve</button>
                    </li>
                ))}
            </ul>
            <h2>All Redflags</h2>
            <ul>
                {redflags.map(redflag => (
                    <li key={redflag.id}>
                        <p><strong>Redflag:</strong> {redflag.redflag}</p>
                        <p><strong>Description:</strong> {redflag.description}</p>
                        <p><strong>Geolocation:</strong> {redflag.geolocation}</p>
                        <p><strong>Image:</strong> {redflag.image}</p>
                        <p><strong>Video:</strong> {redflag.video}</p>
                        <p><strong>Status:</strong> {redflag.status}</p>
                        <button onClick={() => updateStatus('redflag', redflag.id, 'resolved')}>Resolve</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
