import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './UpdateForm.css';

export default function AddIntervention() {
    const [city, setCity] = useState(''); 
    const [geolocation, setGeolocation] = useState('');  
    const navigate = useNavigate();
    const showToastMessage=()=>{
        toast.success('Intervention added successfully!')
      }
    const showErrorToastMessage=()=>{
        toast.error('Failed to add Intervention!')
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
      try {  
        const responseData = await fetch('https://ireporter-server.onrender.com/interventions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                
            },
            body: formData,
        });
        console.log(responseData);
        if (responseData.ok) {
            showToastMessage()
            setTimeout(() => {
                navigate("/interventions"); // Redirect after a short delay
            }, 2000);

                
            console.log('Data submitted successfully!');
            
        } else {
            // Handle error response
            showErrorToastMessage()
            console.error('Failed to submit data');
        }
        } catch (error) {
            // Handle error response
            showErrorToastMessage("error");
            
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


      const handleRedirects=()=>{ 
        navigate("/redflags")
    }  
    return (
        <div className="update-form">
            <h2>Report an Intervention</h2>
            <ToastContainer position='top-center' autoClose={2500}/>
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
                    <button type="submit" >Save</button>
                    <button type="button"onClick={handleRedirects}>Cancel</button>
                </div>
            </form>
        </div>
    );
}
