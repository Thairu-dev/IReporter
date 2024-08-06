import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const { logout } = useAuth();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');  // Redirect to login after logout
    };

    if (error) {
        return <p className="error">{error}</p>;
    }

    if (!userData) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Welcome, {userData.name}</h2>
            <button onClick={handleLogout}>Logout</button>
            <div className='interventions-container'>
            <h2>Interventions</h2>
                <div className='cards-container'>
                {userData.intervention.map((interv) => (
                    <div key={interv.id} className="ui card"> 
                         <div className="image"><img src={interv.image}/></div>
                        <div className="content">
                          <div className="header">{interv.intervention}</div>
                          <div className="meta">{interv.date_added}</div>
                          <div className="description">{interv.description}</div>
                          </div>
                          <div className="extra content">Status : {interv.status} </div>
                          <div className="extra content">Geolocation : {interv.geolocation} </div>
                    
                    </div>
                        
                    ))}

                </div>
            </div>
            
            <div>
                
                <ul>
                    
                </ul>
            </div>

            <div className='redflags-container'>
      
                 <h2>REDFLAGS</h2>
                    {/* <button className="report-btn"> Report a Reflag</button> */}
                <div className='cards-container'>
              
                    {userData.redflags.map((redflg) => (
                      
                      <div key={redflg.id} className="ui card">
                        
                        <div className="image"><img src={redflg.image}/></div>
                        <div className="content">
                          <div className="header">{redflg.redflag}</div>
                          <div className="meta">{redflg.date_added}</div>
                          <div className="description">{redflg.description}</div>
                          </div>
                          <div className="extra content">Status : {redflg.status} </div>
                          <div className="extra content">Geolocation : {redflg.geolocation} </div>
                          <div className='card-btn'>
                            {/* <button className='edit-btn'>Edit</button> */}
                            {/* {redflg.status === "draft" ? (<button>Edit</button>):(<button disable>edit</button>)} */}
                            {/* <button onClick={() => handleDelete(redflg.id)} className='delete-btn'>Delete</button> */}
                          </div>
                          </div>
                          
                    ))}
                
            </div>

      </div>
        </div>
    );
};

export default UserDashboard;