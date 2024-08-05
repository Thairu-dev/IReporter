import React, { useEffect, useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';


const RedFlagsCard = () => {
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
      // <div>
      // <form>
      //   <label for="title">Title</label>
      //   <input type='text' id='title' name='title'></input>

      //   <label for="description" >Description</label>
      //   <textarea id='description' name='description' rows={4}></textarea>


      // </form>
            <div className='cards-container'>
                    {userData.redflags.map((redflg) => (
                      <div className="ui card">
                        <div className="image"><img src=""/></div>
                        <div className="content">
                          <div className="header">{redflg.redflag}</div>
                          <div className="meta">{redflg.date_added}</div>
                          <div className="description">{redflg.description}</div>
                          </div>
                          <div className="extra content">Status : {redflg.status} </div>
                          <div className="extra content">Geolocation : {redflg.geolocation} </div>
                          </div>
                    ))}
                
            </div>
      // </div>
    );
};

export default RedFlagsCard;