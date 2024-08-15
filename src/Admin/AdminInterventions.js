import React, { useEffect, useState } from 'react';
import StatusModal from './StatusModal';
import VideoModal from '../VideoModal';
const AdminInterventions = () => {
    const [interventions, setInterventions] = useState([]);
    const [filter, setFilter] = useState('all');
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState('');
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [currentIntervention, setCurrentIntervention] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('access_token');

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
            setInterventions(interventions.map(intervention => intervention.id === interventionId ? data : intervention));
            setIsStatusModalOpen(false);
        })
        .catch(err => console.error('Error updating status:', err));
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleVideoOpen = (videoUrl) => {
        setCurrentVideoUrl(videoUrl);
        setIsVideoOpen(true);
    };

    const handleVideoClose = () => {
        setIsVideoOpen(false);
        setCurrentVideoUrl('');
    };

    const handleStatusModalOpen = (intervention) => {
        setCurrentIntervention(intervention);
        setIsStatusModalOpen(true);
    };

    const handleStatusModalClose = () => {
        setIsStatusModalOpen(false);
        setCurrentIntervention(null);
    };

    const filteredInterventions = filter === 'all'
        ? interventions
        : interventions.filter(intervention => intervention.status === filter);

    return (
        <div className='interventions-container'>
            <h1>Admin Dashboard</h1>
            

            <h2>INTERVENTIONS</h2>
            <div className="filter-container">
                <label htmlFor="filter">Filter by Status:</label>
                <select id="filter" onChange={handleFilterChange} value={filter}>
                    <option value="all">All</option>
                    <option value="rejected">Rejected</option>
                    <option value="under_investigation">Under Investigation</option>
                    <option value="resolved">Resolved</option>
                </select>
            </div>
            <div className='cards-container'>
                {filteredInterventions.map(intervention => (
                    <div key={intervention.id} className="ui card">
                        <div className="image"><img src={intervention.image || "https://via.placeholder.com/150"} alt={intervention.intervention} /></div>
                        <div className="content">
                            <div className="header">Title:{intervention.intervention}</div>
                            <div className="description">Description:{intervention.description}</div>
                            <div className="meta">
                <p><strong>Date:</strong> {intervention.date_added.split(" ")[0]}</p>
                <p><strong>Time:</strong> {intervention.date_added.split(" ")[1]}</p>
                </div>
                        
                        </div>
                        <div className="extra content">
                <p><strong>Status:</strong> <span className={`status-${intervention.status.toLowerCase()}`}>{intervention.status}</span></p>
            </div>
                        <div className="extra content">Geolocation: {intervention.geolocation}</div>
                        <div className='card-btn'>
                        <button 
                                        onClick={() => handleVideoOpen(intervention.video)}
                                       /* disabled={!intervention.video}*/
                                    >
                                        Play Video
                                    </button>
                            {/*intervention.status !== 'resolved' &&*/ (
                                    <button onClick={() => handleStatusModalOpen(intervention)}>Update Status</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <VideoModal 
                isOpen={isVideoOpen} 
                onClose={handleVideoClose} 
                videoUrl={currentVideoUrl} 
            />
            {isStatusModalOpen && currentIntervention && (
                <StatusModal
                    isOpen={isStatusModalOpen}
                    onClose={handleStatusModalClose}
                    item={currentIntervention}
                    updateStatus={updateStatus}
                    type="intervention"
                />
            )}
        </div>
    );
};

export default AdminInterventions;