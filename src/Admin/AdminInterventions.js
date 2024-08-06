import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminInterventions = () => {
    const { logout } = useAuth();
    const [interventions, setInterventions] = useState([]);
    const [filter, setFilter] = useState('all'); // State for filter
    const [statusUpdate, setStatusUpdate] = useState({}); // State for status update

    useEffect(() => {
        const token = localStorage.getItem('access_token'); // Make sure you use the correct key

        fetch('https://ireporter-server.onrender.com/interventions', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(data => setInterventions(data))
        .catch(err => console.error('Error fetching interventions:', err));
    }, []);

    const updateStatus = (interventionId, newStatus) => {
        const token = localStorage.getItem('access_token');
        fetch(`https://ireporter-server.onrender.com/admin/intervention/${interventionId}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ status: newStatus })
        })
        .then(response => response.json())
        .then(data => {
            setInterventions(interventions.map(interv => interv.id === interventionId ? data : interv));
        })
        .catch(err => console.error('Error updating status:', err));
    };

    const handleStatusChange = (e, interventionId) => {
        const newStatus = e.target.value;
        setStatusUpdate(prev => ({ ...prev, [interventionId]: newStatus }));
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const filteredInterventions = filter === 'all'
        ? interventions
        : interventions.filter(intervention => intervention.status === filter);

    return (
        <div className='interventions-container'>
            <h1>Admin Dashboard</h1>
            <button onClick={logout}>Logout</button>
            <div className="filter-container">
                <label htmlFor="filter">Filter by Status:</label>
                <select id="filter" onChange={handleFilterChange} value={filter}>
                    <option value="all">All</option>
                    <option value="reported">Reported</option>
                    <option value="under_review">Under Review</option>
                    <option value="resolved">Resolved</option>
                </select>
            </div>

            <h2>INTERVENTIONS</h2>
            <div className='cards-container'>
                {filteredInterventions.map(intervention => (
                    <div key={intervention.id} className="ui card">
                        <div className="image"><img src={intervention.image} alt={intervention.intervention} /></div>
                        <div className="content">
                            <div className="header">{intervention.intervention}</div>
                            <div className="meta">{intervention.date_added}</div>
                            <div className="description">{intervention.description}</div>
                        </div>
                        <div className="extra content">Status: {intervention.status}</div>
                        <div className="extra content">Geolocation: {intervention.geolocation}</div>
                        <div className='card-btn'>
                            {intervention.status /*!== 'resolved'*/ && (
                                <>
                                    <select 
                                        value={statusUpdate[intervention.id] || intervention.status}
                                        onChange={(e) => handleStatusChange(e, intervention.id)}
                                        onBlur={() => updateStatus(intervention.id, statusUpdate[intervention.id] || intervention.status)}
                                    >
                                        <option value="reported">Reported</option>
                                        <option value="under_review">Under Review</option>
                                        <option value="resolved">Resolved</option>
                                    </select>
                                    <button 
                                        onClick={() => updateStatus(intervention.id, statusUpdate[intervention.id] || intervention.status)}
                                        disabled={intervention.status === 'resolved'}
                                    >
                                        Update
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminInterventions;