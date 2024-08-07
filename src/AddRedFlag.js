import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddRedFlag() {
  const [city, setCity] = useState('');
  const [geolocation, setGeolocation] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState(null);
  const [interventions, setInterventions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access_token'); // Make sure you use the correct key

    fetch('https://ireporter-server.onrender.com/interventions', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(data => setInterventions(data))
    .catch(err => console.error('Error fetching interventions:', err));
  }, []);

  const handleCityChange = (e) => {
    setCity(e.target.value);
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

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleMediaChange = (e) => {
    setMedia(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('intervention', title);
    formData.append('geolocation', geolocation);
    formData.append('description', description);
    if (media) {
      formData.append('image', media);
    }

    const token = localStorage.getItem('access_token');

    axios.post('https://ireporter-server.onrender.com/interventions', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.status === 201) {
        alert('Intervention submitted successfully');
        setInterventions([...interventions, response.data]); // Add the new intervention to the state
      } else {
        alert('Failed to submit intervention');
      }
    })
    .catch(error => {
      console.error('Submission error:', error);
      alert('An error occurred while submitting the intervention');
    });
  };

  return (
    <div className='ui form'>
      <div className='field'>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <label htmlFor="title">Title</label>
          <input 
            type='text' 
            id='title' 
            name='title' 
            value={title} 
            onChange={handleTitleChange}
          />

          <label htmlFor="city">City</label>
          <input 
            type='text' 
            id='city' 
            name='city' 
            value={city} 
            onChange={handleCityChange}
          />
          <button type="button" onClick={handleGeocode}>Get Coordinates</button>

          <label htmlFor="geolocation">Geolocation (Lat, Long)</label>
          <input 
            type='text' 
            id='geolocation' 
            name='geolocation' 
            value={geolocation} 
            readOnly
          />

          <label htmlFor="description">Description</label>
          <textarea 
            id='description' 
            name='description' 
            rows={3} 
            value={description} 
            onChange={handleDescriptionChange}
          />

          <label htmlFor="media">Image/Video</label>
          <input 
            type='file' 
            id='media' 
            name='media' 
            onChange={handleMediaChange}
          />
          <br/>

          <button className='submit-button' type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
}




