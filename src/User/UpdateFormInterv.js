import React, { useState } from 'react';
import './UpdateForm.css'; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const UpdateFormInterv = ({ intervention, handleClose, handleSave }) => {
    const [formData, setFormData] = useState({
        intervention: intervention.intervention,
        description: intervention.description,
        geolocation: intervention.geolocation,
        image: null,
        video: null,
    });

    const [imageName, setImageName] = useState(formData.image?.name || '');
    const [videoName, setVideoName] = useState(formData.video?.name || '');
    const [city, setCity] = useState(''); // New state for city input


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: files ? files[0] : value
        }));

        if (name === 'image') {
            setImageName(files[0]?.name || '');
        } else if (name === 'video') {
            setVideoName(files[0]?.name || '');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Call handleSave and handle success/error feedback
        handleSave(formData)
            .then(() => {
                showToastMessage(); // Show success toast message
                handleClose(); // Close the form upon successful save
            })
            .catch(() => {
                showErrorToastMessage(); // Show error toast message
            });
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const showToastMessage = () => {
        toast.success('Redflag updated successfully!');
    };

    const showErrorToastMessage = () => {
        toast.error('Failed to update redflag!');
    };

    const handleGeocode = () => {
        axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: city,
                format: 'json'
            }
        })
        .then(response => {
            if (response.data.length > 0) {
                const { lat, lon } = response.data[0];
                setFormData(prevData => ({
                    ...prevData,
                    geolocation: `${lat}, ${lon}`
                }));
            } else {
                alert('Location not found');
            }
        })
        .catch(error => {
            console.error('Geocoding error:', error);
        });
    };
    return (
        <div className="update-form">
            <h2>Update Intervention</h2>
            <ToastContainer position='top-center' autoClose={1000} />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        Intervention:
                        <input 
                            type="text" 
                            name="intervention" 
                            value={formData.intervention} 
                            onChange={handleChange} 
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Description:
                        <textarea 
                            name="description" 
                            value={formData.description} 
                            onChange={handleChange} 
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        City:
                        <input 
                            type="text" 
                            name="city" 
                            value={city} 
                            onChange={handleCityChange} 
                        />
                    </label>
                    <button type="button" onClick={handleGeocode}>Get Coordinates</button>
                </div>
                <div className="form-group">
                    <label>
                        Geolocation:
                        <input 
                            type="text" 
                            name="geolocation" 
                            value={formData.geolocation} 
                            onChange={handleChange} 
                        />
                    </label>
                </div>
                <div className="form-group file-input-wrapper">
                    <label className="file-input-label">
                        Choose Image
                        <input 
                            type="file" 
                            name="image" 
                            className="file-input" 
                            onChange={handleChange} 
                        />
                    </label>
                    <span className="file-input-display">{imageName || 'No file chosen'}</span>
                </div>
                <div className="form-group file-input-wrapper">
                    <label className="file-input-label">
                        Choose Video
                        <input 
                            type="file" 
                            name="video" 
                            className="file-input" 
                            onChange={handleChange} 
                        />
                    </label>
                    <span className="file-input-display">{videoName || 'No file chosen'}</span>
                </div>
                <div className="form-buttons">
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateFormInterv;
