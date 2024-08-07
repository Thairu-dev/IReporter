import React from 'react'
import './UpdateForm.css';

export default function Addintervention() {
  return (
    <div className="update-form">
    <h2>Report an Intervention</h2>
    <form >
        <div className="form-group">
            <label>
                Interventions :
                <input 
                    type="text" 
                    name="redflag" 
                    
                />
            </label>
        </div>
        <div className="form-group">
            <label>
                Description:
                <textarea 
                    name="description" 
                    
                />
            </label>
        </div>
        <div className="form-group">
            <label>
                Geolocation:
                <input 
                    type="text" 
                    name="geolocation" 
                    
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
                    
                />
            </label>
            {/* <span className="file-input-display">{imageName || 'No file chosen'}</span> */}
        </div>
        <div className="form-group file-input-wrapper">
            <label className="file-input-label">
                Choose Video
                <input 
                    type="file" 
                    name="video" 
                    className="file-input" 
                    
                />
            </label>
            <span className="file-input-display"></span>
        </div>
        <div className="form-buttons">
            <button type="submit">Save</button>
            <button type="button" >Cancel</button>
        </div>
    </form>
</div>
  )
}

