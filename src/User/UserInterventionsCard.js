import React, { useEffect, useState } from 'react';
import "./Userspinner.css"



const InterventionsCard = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
   

    useEffect(() => {
        fetch('https://ireporter-server.onrender.com/check_session', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.id) {
                setUserData(data);
            } else {
                setError('Failed to load user data');
            }
        })
        .catch(() => setError('An error occurred'));
    }, [userData]);

    
    function handleDelete (intervId) {
      fetch(`https://ireporter-server.onrender.com/interventions/${intervId}`,{
        method: `DELETE`,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        }  
      })
      .then(response => response.json())
      .then (() => {
        const updatedInterventions = userData.interventions.filter(intervention => intervention.id !== intervId);
        setUserData(prevdata => ({...prevdata, interventions: updatedInterventions}));
      })
      .catch(() => setError("An error occurred while deleting the redflag"));
      console.log(intervId);
    };
    
    
    if (error) {
        return <p className="error">{error}</p>;
    }

    if (!userData.interventions.length) {
      return (
        <div className="spinner-container">
            <div className="spinner"></div>
        </div>
    );
    }
    
    // console.log(newUserData);
    return (
      <div className='interventions-container'>
      
        <h2>Interventions</h2>
          <button className="report-btn"> Report an intervention</button>
            <div className='cards-container'>
            {userData?.intervention?.length > 0 ? (
                    userData.intervention.map((interv) => (
                      
                      <div key={interv.id} className="ui card">
                        
                        <div className="image"><img src={interv.image} alt={interv.name} /></div>
                        <div className="content">
                          <div className="header">{interv.redflag}</div>
                          <div className="meta">{interv.date_added}</div>
                          <div className="description">{interv.description}</div>
                          </div>
                          <div className="extra content">Status : {interv.status} </div>
                          <div className="extra content">Geolocation : {interv.geolocation} </div>
                          <div className='card-btn'>
                            {/* <button className='edit-btn'>Edit</button> */}
                            {interv.status === "draft" ? (<button>Edit</button>):(<button disable>edit</button>)}
                            <button onClick={() => handleDelete(interv.id)} className='delete-btn'>Delete</button>
                          </div>
                          </div>
                          
                    )))
                    : (
                        <p>No interventions available.</p>
                    )}

            </div>

      </div>
    );
};

export default InterventionsCard;

