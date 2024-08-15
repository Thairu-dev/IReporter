import React, { useEffect, useState } from 'react';
import StatusModal from './StatusModal';
import VideoModal from '../VideoModal';

const AdminRedflags = () => {
    const [redflags, setRedflags] = useState([]);
    const [filter, setFilter] = useState('all');
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState('');
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [currentRedflag, setCurrentRedflag] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('access_token');

        fetch('https://ireporter-server.onrender.com/redflags', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(data => setRedflags(data))
        .catch(err => console.error('Error fetching redflags:', err));
    }, []);

    const updateStatus = (redflagId, newStatus) => {
        const token = localStorage.getItem('access_token');
        fetch(`https://ireporter-server.onrender.com/admin/redflag/${redflagId}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ status: newStatus })
        })
        .then(response => response.json())
        .then(data => {
            setRedflags(redflags.map(redflag => redflag.id === redflagId ? data : redflag));
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

    const handleStatusModalOpen = (redflag) => {
        setCurrentRedflag(redflag);
        setIsStatusModalOpen(true);
    };

    const handleStatusModalClose = () => {
        setIsStatusModalOpen(false);
        setCurrentRedflag(null);
    };

    const filteredRedflags = filter === 'all'
        ? redflags
        : redflags.filter(redflag => redflag.status === filter);

    return (
        <div className='redflags-container'>
            <h1>Admin Dashboard</h1>
           

            <h2>REDFLAGS</h2>
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
                {filteredRedflags.map(redflag => (
                    <div key={redflag.id} className="ui card">
                        <div className="image"><img src={redflag.image || "https://via.placeholder.com/150"} alt={redflag.redflag} /></div>
                        <div className="content">
                            <div className="header">Title:{redflag.redflag}</div>
                            <div className="description">Description:{redflag.description}</div>
                            <div className="meta">
                <p><strong>Date:</strong> {redflag.date_added.split(" ")[0]}</p>
                <p><strong>Time:</strong> {redflag.date_added.split(" ")[1]}</p>
                </div>
                        
                        </div>
                        <div className="extra content">
                <p><strong>Status:</strong> <span className={`status-${redflag.status.toLowerCase()}`}>{redflag.status}</span></p>
            </div>
                        <div className="extra content">Geolocation: {redflag.geolocation}</div>
                        <div className='card-btn'>
                                <button 
                                        onClick={() => handleVideoOpen(redflag.video)}
                                        /*disabled={!redflag.video}*/
                                    >
                                        Play Video
                                    </button>
                            {/*redflag.status !== 'resolved' && */(
                                    <button onClick={() => handleStatusModalOpen(redflag)}>Update Status</button>
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
            {isStatusModalOpen && currentRedflag && (
                <StatusModal
                    isOpen={isStatusModalOpen}
                    onClose={handleStatusModalClose}
                    item={currentRedflag}
                    updateStatus={updateStatus}
                    type="redflag"
                />
            )}
        </div>
    );
};

export default AdminRedflags;