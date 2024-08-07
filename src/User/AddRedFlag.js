import React from 'react';
import './UpdateForm.css';

export default function AddRedFlag() {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const responseData = await fetch('https://ireporter-server.onrender.com/redflags', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: formData,
        });

        if (responseData.ok) {
            // Handle success response
            console.log('Data submitted successfully!');
        } else {
            // Handle error response
            console.error('Failed to submit data');
        }
    };

    return (
        <div className="update-form">
            <h2>Report a Redflag</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        Redflag:
                        <input type="text" name="redflag" />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Description:
                        <textarea name="description" />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Geolocation:
                        <input type="text" name="geolocation" />
                    </label>
                </div>
                <div className="form-group file-input-wrapper">
                    <label className="file-input-label">
                        Choose Image
                        <input type="file" name="image" className="file-input" />
                    </label>
                </div>
                <div className="form-group file-input-wrapper">
                    <label className="file-input-label">
                        Choose Video
                        <input type="file" name="video" className="file-input" />
                    </label>
                </div>
                <div className="form-buttons">
                    <button type="submit">Save</button>
                    <button type="button">Cancel</button>
                </div>
            </form>
        </div>
    );
}