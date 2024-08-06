import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';



const RedFlagsCard = () => {
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

    
    function handleDelete (redflagId) {
      fetch(`https://ireporter-server.onrender.com/redflags/${redflagId}`,{
        method: `DELETE`,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        }  
      })
      .then(response => response.json())
      .then (() => {
        const updatedRedflags = userData.filter(redflag => redflag.id !== redflagId);
        setUserData({...userData,updatedRedflags});
      })
      .catch(() => setError("An error occurred while deleting the redflag"));
      console.log(redflagId);
    };
    
    
    if (error) {
        return <p className="error">{error}</p>;
    }

    if (!userData) {
        return <p>Loading...</p>;
    }
    
    // console.log(newUserData);
    return (
      <div className='redflags-container'>
      
        <h2>REDFLAGS</h2>
          <button className="report-btn"> Report a Reflag</button>
            <div className='cards-container'>
              
                    {userData.redflags.map((redflg) => (
                      
                      <div key={redflg.id} className="ui card">
                        
                        <div className="image"><img src={redflg.image} alt='Redflag' /></div>
                        <div className="content">
                          <div className="header">{redflg.redflag}</div>
                          <div className="meta">{redflg.date_added}</div>
                          <div className="description">{redflg.description}</div>
                          </div>
                          <div className="extra content">Status : {redflg.status} </div>
                          <div className="extra content">Geolocation : {redflg.geolocation} </div>
                          <div className='card-btn'>
                            {/* <button className='edit-btn'>Edit</button> */}
                            {redflg.status === "draft" ? (<button>Edit</button>):(<button disable>edit</button>)}
                            <button onClick={() => handleDelete(redflg.id)} className='delete-btn'>Delete</button>
                          </div>
                          </div>
                          
                    ))}
                
            </div>

      </div>
    );
};

export default RedFlagsCard;