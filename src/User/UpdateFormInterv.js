import React, { useState } from 'react';
import './UpdateForm.css'; 

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
        handleSave(formData);
    };

    return (
        <div className="update-form">
            <h2>Update Intervention</h2>
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