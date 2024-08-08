import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Userspinner.css"


const RedFlagsCard = () => {
    const [userData, setUserData] = useState({ redflags: [] });
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

    function handleDelete(redflagId) {
        fetch(`https://ireporter-server.onrender.com/redflags/${redflagId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json'
            }  
        })
        .then(response => response.json())
        .then(() => {
            const updatedRedflags = userData.redflags.filter(redflag => redflag.id !== redflagId);
            setUserData(prevData => ({ ...prevData, redflags: updatedRedflags }));
        })
        .catch(() => setError("An error occurred while deleting the redflag"));
    }

    if (error) {
        return <p className="error">{error}</p>;
    }

    if (!userData.redflags.length) {
      return (
        <div className="spinner-container">
            <div className="spinner"></div>
        </div>
    );
    }

    return (
        <div className='redflags-container'>
            <h2>REDFLAGS</h2>
            <button onClick={() => navigate('/addredflag')}className="report-btn"> Report a Redflag</button>
            <div className='cards-container'>
                {userData.redflags.map((redflg) => (
                    <div key={redflg.id} className="ui card">
                        <div className="image"><img src={redflg.image} alt={redflg.redflag} /></div>
                        <div className="content">
                            <div className="header">{redflg.redflag}</div>
                            <div className="meta">{redflg.date_added}</div>
                            <div className="description">{redflg.description}</div>
                        </div>
                        <div className="extra content">Status : {redflg.status} </div>
                        <div className="extra content">Geolocation : {redflg.geolocation} </div>
                        <div className='card-btn'>
                            {redflg.status === "draft" ? (
                                <>
                                    <button>Edit</button>
                                    <button onClick={() => handleDelete(redflg.id)} className='delete-btn'>Delete</button>
                                </>
                            ) : (
                                <>
                                    <button disabled>Edit</button>
                                    <button disabled className='delete-btn'>Delete</button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RedFlagsCard;