import React, { useState } from 'react';
import axios from 'axios';

export default function AddRedFlag() {
  const [city, setCity] = useState('');
  const [geolocation, setGeolocation] = useState('');

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleGeocode = async () => {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: city,
          format: 'json'
        }
      });

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setGeolocation(`${lat}, ${lon}`);
      } else {
        alert('Location not found');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='ui form'>
      <div className='field'>
        <form encType='multipart/form-data'>
          <label htmlFor="title">Title</label>
          <input type='text' id='title' name='title'></input>

          <label htmlFor="city">City</label>
          <input 
            type='text' 
            id='city' 
            name='city' 
            value={city} 
            onChange={handleCityChange}
          ></input>
          <button type="button" onClick={handleGeocode}>Get Coordinates</button>

          <label htmlFor="geolocation">Geolocation (Lat, Long)</label>
          <input 
            type='text' 
            id='geolocation' 
            name='geolocation' 
            value={geolocation} 
            readOnly
          ></input>

          <label htmlFor="description">Description</label>
          <textarea id='description' name='description' rows={3}></textarea>

          <label htmlFor="media">Image/Video</label>
          <input type='file' id='media' name='media'></input>
          <br></br>

          <button className='submit-button'>Submit</button>
        </form>
      </div>
    </div>
  );
}


