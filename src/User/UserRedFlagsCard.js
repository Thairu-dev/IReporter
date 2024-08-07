import React, { useEffect, useState } from 'react';
import UpdateForm from '../UpdateForm';
import Modal from '../Modal'; 
import "./Userspinner.css"
import { useNavigate } from 'react-router-dom';


const RedFlagsCard = () => {
    const [userData, setUserData] = useState({ redflags: [] });
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentRedflag, setCurrentRedflag] = useState(null);
    const navigate = useNavigate()


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

    const handleDelete = (redflagId) => {
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
    };

    const handleEdit = (redflag) => {
        setCurrentRedflag(redflag);
        setIsEditing(true);
    };

    const handleClose = () => {
        setIsEditing(false);
        setCurrentRedflag(null);
    };

    const handleSave = (formData) => {
        const form = new FormData();
        form.append('redflag', formData.redflag);
        form.append('description', formData.description);
        form.append('geolocation', formData.geolocation);
        if (formData.image) {
            form.append('image', formData.image);
        }
        if (formData.video) {
            form.append('video', formData.video);
        }

        fetch(`https://ireporter-server.onrender.com/redflags/${currentRedflag.id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: form
        })
        .then(response => response.json())
        .then(updatedRedflag => {
            const updatedRedflags = userData.redflags.map(redflag => 
                redflag.id === updatedRedflag.id ? updatedRedflag : redflag
            );
            setUserData(prevData => ({ ...prevData, redflags: updatedRedflags }));
            handleClose();
        })
        .catch(() => setError('An error occurred while saving the redflag'));
    };

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
            <button onClick={() => navigate("/addredflag")}className="report-btn"> Report a Redflag</button>
            <div className='cards-container'>
                {userData.redflags.map((redflg) => (
                    <div key={redflg.id} className="ui card">
                        <div className="image">
                            <img src={redflg.image || "https://via.placeholder.com/150"} alt={redflg.redflag} />
                        </div>
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
                                    <button onClick={() => handleEdit(redflg)}>Edit</button>
                                    <button onClick={() => handleDelete(redflg.id)} className='delete-btn'>Delete</button>
                                </>
                            ) : (
                                <>
                                    <button disabled>Edit</button>
                                    <button disabled>Delete</button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <Modal isOpen={isEditing} onClose={handleClose}>
                <UpdateForm
                    redflag={currentRedflag}
                    handleClose={handleClose}
                    handleSave={handleSave}
                />
            </Modal>
        </div>
    );
};

export default RedFlagsCard;