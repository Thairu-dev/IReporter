import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import RedflagsPage from '../RedFlags';
import InterventionsPage from '../InterventionsPage';
import './AdminDashboard.css'
const AdminDashboard = () => {
  const [selectedOption, setSelectedOption] = useState('reports');
  const { logout } = useAuth(); // Assuming you have a logout function from AuthContext
  const [interventions, setInterventions] = useState([]);
  const [redflags, setRedflags] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access_token'); // Make sure you use the correct key
    fetch('https://ireporter-server.onrender.com/interventions', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => response.json())
      .then(data => setInterventions(data))
      .catch(err => console.error('Error fetching interventions:', err));

    fetch('https://ireporter-server.onrender.com/redflags', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => response.json())
      .then(data => setRedflags(data))
      .catch(err => console.error('Error fetching redflags:', err));
  }, []);

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const updateStatus = (entityType, entityId, newStatus) => {
    const token = localStorage.getItem('access_token');
    fetch(`https://ireporter-server.onrender.com/admin/${entityType}/${entityId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status: newStatus })
    })
      .then(response => response.json())
      .then(data => {
        if (entityType === 'intervention') {
          setInterventions(interventions.map(interv => interv.id === entityId ? data : interv));
        } else {
          setRedflags(redflags.map(redflag => redflag.id === entityId ? data : redflag));
        }
      })
      .catch(err => console.error('Error updating status:', err));
  };

  return (
    <div>
      <div>
        <div className='admin-dropdown'>
      <label htmlFor="reports-about" >Reports About</label>
        <select id="reports-about" value={selectedOption} onChange={handleDropdownChange}>
          <option value="reports">Redflags</option>
          <option value="interventions">Interventions</option>
        </select>
        </div>
        {selectedOption === 'reports' && <RedflagsPage redflags={redflags} updateStatus={updateStatus} />}
        {selectedOption === 'interventions' && <InterventionsPage interventions={interventions} updateStatus={updateStatus} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
