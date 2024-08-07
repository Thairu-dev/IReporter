import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import './UpdateForm.css';

export default function AddIntervention() {
    const [city, setCity] = useState(''); 
    const [geolocation, setGeolocation] = useState('');  
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const responseData = await fetch('https://ireporter-server.onrender.com/interventions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                
            },
            body: formData,
        });
        console.log(responseData);
        if (responseData.ok) {
            // Handle success response
            console.log('Data submitted successfully!');
        } else {
            // Handle error response
            console.error('Failed to submit data');
        }
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
            setGeolocation(`${lat}, ${lon}`);
          } else {
            alert('Location not found');
          }
        })
        .catch(error => {
          console.error('Geocoding error:', error);
        });
      };

    const handleCityChange = (e) => {
        setCity(e.target.value);
      };

    return (
        <div className="update-form">
            <h2>Report an Intervention</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        Intervention:
                        <input type="text" name="intervention" />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Description:
                        <textarea name="description" />
                    </label>
                </div>
                <div className='form-group'>
                 <label htmlFor="city">City</label>
                    <input 
                        type='text' 
                        id='city' 
                        name='city' 
                        value={city} 
                        onChange={handleCityChange}
                    />
                <div className="form-buttons" ><button type="button"  onClick={handleGeocode}>Get Coordinates</button></div>
          </div>
          <div className="form-group">
                    <label htmlFor="geolocation">Geolocation (Lat, Long)</label>
                            <input 
                                type='text' 
                                id='geolocation' 
                                name='geolocation' 
                                value={geolocation} 
                                readOnly
                            />
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