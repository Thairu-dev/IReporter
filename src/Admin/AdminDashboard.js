import React, { useEffect, useState } from 'react';
import Redflagsmap from '../RedflagsMap'; // Import the map component
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [selectedType, setSelectedType] = useState('interventions'); // State to handle dropdown selection
  const [interventions, setInterventions] = useState([]);
  const [redflags, setRedflags] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    
    // Fetch interventions
    fetch('https://ireporter-server.onrender.com/interventions', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => response.json())
      .then(data => setInterventions(data))
      .catch(err => setError('Error fetching interventions'));

    // Fetch redflags
    fetch('https://ireporter-server.onrender.com/redflags', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => response.json())
      .then(data => setRedflags(data))
      .catch(err => setError('Error fetching redflags'));
  }, []);

  // Filter records based on selected type
  const records = selectedType === 'interventions' ? interventions : redflags;

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar Section */}
      <div style={{ width: '300px', padding: '10px', backgroundColor: '#f4f4f4' }}>
        <h2>Admin Dashboard</h2>
        <label htmlFor="type-select">Reports</label>
        <select
          id="type-select"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          style={{ marginBottom: '10px', width: '100%' }}
        >
          <option value="interventions">Interventions</option>
          <option value="redflags">Redflags</option>
        </select>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
        {records.length > 0 ? (
          <div style={{ overflowY: 'auto', maxHeight: '80vh' }}>
            {records.map((item, index) => (
              <div key={index} style={{ marginBottom: '10px', padding: '5px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <p><strong>Description:</strong> {item.description}</p>
                <p><strong>Date:</strong> {item.date_added.split(" ")[0]}</p>
                <p><strong>Time:</strong> {item.date_added.split(" ")[1]}</p>
                <p><strong>Status:</strong> <span className={`status-${item.status.toLowerCase()}`}>{item.status}</span></p>
              </div>
            ))}
          </div>
        ) : (
          <p>No {selectedType} available.</p>
        )}
      </div>
      
      {/* Map Section */}
      <div style={{ flexGrow: 1 }}>
        <Redflagsmap
          interventions={selectedType === 'interventions' ? interventions : []}
          redflags={selectedType === 'redflags' ? redflags : []}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;


