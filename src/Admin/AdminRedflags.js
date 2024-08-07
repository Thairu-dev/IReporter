import React, { useEffect, useState } from 'react';

const AdminRedflags = () => {
    const [redflags, setRedflags] = useState([]);
    const [filter, setFilter] = useState('all'); 
    const [statusUpdate, setStatusUpdate] = useState({}); 

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
        })
        .catch(err => console.error('Error updating status:', err));
    };

    const handleStatusChange = (e, redflagId) => {
        const newStatus = e.target.value;
        setStatusUpdate(prev => ({ ...prev, [redflagId]: newStatus }));
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const filteredRedflags = filter === 'all'
        ? redflags
        : redflags.filter(redflag => redflag.status === filter);

    return (
        <div className='redflags-container'>
            <h1>Admin Dashboard</h1>
            <div className="filter-container">
                <label htmlFor="filter">Filter by Status:</label>
                <select id="filter" onChange={handleFilterChange} value={filter}>
                    <option value="all">All</option>
                    <option value="reported">Reported</option>
                    <option value="under_review">Under Review</option>
                    <option value="resolved">Resolved</option>
                </select>
            </div>

            <h2>REDFLAGS</h2>
        
            <div className='cards-container'>
                {filteredRedflags.map(redflag => (
                    <div key={redflag.id} className="ui card">
                        <div className="image"><img src={redflag.image || "https://via.placeholder.com/150"} alt={redflag.redflag} /></div>
                        <div className="content">
                            <div className="header">{redflag.redflag}</div>
                            <div className="meta">{redflag.date_added}</div>
                            <div className="description">{redflag.description}</div>
                        </div>
                        <div className="extra content">Status : {redflag.status}</div>
                        <div className="extra content">Geolocation : {redflag.geolocation}</div>
                        <div className='card-btn'>
                            {redflag.status/*!== 'resolved'*/ && (
                                <>
                                    <select 
                                        value={statusUpdate[redflag.id] || redflag.status}
                                        onChange={(e) => handleStatusChange(e, redflag.id)}
                                        onBlur={() => updateStatus(redflag.id, statusUpdate[redflag.id] || redflag.status)}
                                    >
                                        <option value="rejected">Rejected</option>
                                        <option value="under_investigation">under investigation</option>
                                        <option value="resolved">Resolved</option>
                                    </select>
                                    <button 
                                        onClick={() => updateStatus(redflag.id, statusUpdate[redflag.id] || redflag.status)}
                                        disabled={redflag.status === 'resolved'}
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

export default AdminRedflags;