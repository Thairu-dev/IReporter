import React, { useEffect, useState } from 'react';
import UpdateFormInterv from './UpdateFormInterv';
import VideoModal from '../VideoModal';
import Modal from '../Modal';
import "./Userspinner.css";
import { useNavigate } from 'react-router-dom';
import { toast,ToastContainer} from 'react-toastify';
const InterventionsCard = () => {
    const [userData, setUserData] = useState({ intervention: [] });
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentIntervention, setCurrentIntervention] = useState(null);
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState('');
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

    const handleDelete = (intervId) => {
        fetch(`https://ireporter-server.onrender.com/interventions/${intervId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(() => {
            const updatedInterventions = userData.intervention.filter(intervention => intervention.id !== intervId);
            setUserData(prevData => ({ ...prevData, intervention: updatedInterventions }));
            toast.success("Intervention deleted successfully!")
        })
        .catch(() => setError("An error occurred while deleting the intervention"));
    };

    const handleEdit = (intervention) => {
        setCurrentIntervention(intervention);
        setIsEditing(true);
    };

    const handleClose = () => {
        setIsEditing(false);
        setCurrentIntervention(null);
    };

    const handleSave = (formData) => {
        const form = new FormData();
        form.append('intervention', formData.intervention);
        form.append('description', formData.description);
        form.append('geolocation', formData.geolocation);
        if (formData.image) {
            form.append('image', formData.image);
        }
        if (formData.video) {
            console.log(formData.video)
            form.append('video', formData.video);
        }

        fetch(`https://ireporter-server.onrender.com/interventions/${currentIntervention.id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: form
        })
        .then(response => response.json())
        .then(updatedIntervention => {
            const updatedInterventions = userData.intervention.map(intervention =>
                intervention.id === updatedIntervention.id ? updatedIntervention : intervention
            );
            setUserData(prevData => ({ ...prevData, intervention: updatedInterventions }));
            toast.success("Intervention updated successfully!")
            handleClose();
        })
        .catch(() => setError('An error occurred while saving the intervention'));
    };

    const handleVideoOpen = (videoUrl) => {
        setCurrentVideoUrl(videoUrl);
        setIsVideoOpen(true);
    };

    const handleVideoClose = () => {
        setIsVideoOpen(false);
        setCurrentVideoUrl('');
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
        <div className='interventions-container'>
            <div className='header-container'>
                <h2>Interventions</h2>
                <ToastContainer position='top-center' autoClose={1000}/>
                <button onClick={() => navigate("/addintervention")} className="report-btn"> Report an Intervention</button>
            </div>
            
            <div className='cards-container'>
            {userData.intervention.length === 0 ? (
    <div className="no-data-container">
        <p>You do not have any Interventions</p>
    </div>
) : (
    userData.intervention.map((interv) => (
        <div key={interv.id} className="ui card">
            <div className="image">
                <img src={interv.image || "https://via.placeholder.com/150"} alt={interv.intervention} />
            </div>
            <div className="content">
                <div className="header">{interv.intervention}</div>
                <div className="meta">{interv.date_added}</div>
                <div className="description">{interv.description}</div>
            </div>
            <div className="extra content">Status : {interv.status} </div>
            <div className="extra content">Geolocation : {interv.geolocation} </div>
            <div className='card-btn'>
                {/*interv.video && */(
                    <button onClick={() => handleVideoOpen(interv.video)}>Play Video</button>
                )}
                {interv.status /*=== "draft" */?(
                    <>
                        <button onClick={() => handleEdit(interv)}>Update</button>
                        <button onClick={() => handleDelete(interv.id)} className='delete-btn'>Delete</button>
                    </>
                ) : (
                    <>
                        <button disabled>Update</button>
                        <button disabled>Delete</button>
                    </>
                )}
            </div>
        </div>
    ))
)}
            </div>
            <Modal isOpen={isEditing} onClose={handleClose}>
                <UpdateFormInterv
                    intervention={currentIntervention}
                    handleClose={handleClose}
                    handleSave={handleSave}
                />
            </Modal>
            <VideoModal 
                isOpen={isVideoOpen} 
                onClose={handleVideoClose} 
                videoUrl={currentVideoUrl} 
            />
        </div>
    );
};

export default InterventionsCard;
