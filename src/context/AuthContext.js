import React, { createContext, useState, useContext, useEffect } from 'react';
import "../Spinner.css";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            fetch('https://ireporter-server.onrender.com/check_session', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                if (data && data.id && data.token_verified) {
                    setUser(data);
                } else {
                    localStorage.removeItem('access_token');
                    setUser(null);
                }
            })
            .catch(error => {
                console.error('Error during session check:', error);
                localStorage.removeItem('access_token');
                setUser(null);
            })
            .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = (email, password) => {
        return fetch('https://ireporter-server.onrender.com/login', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.access_token) {
                localStorage.setItem('access_token', data.access_token);
                return fetch('https://ireporter-server.onrender.com/check_session', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${data.access_token}`
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(userData => {
                    console.log('Session Check After Login:', userData); 
                    if (userData.token_verified) {
                        setUser(userData);
                        return userData;
                    } else {
                        throw new Error('Token not verified');
                    }
                });
            } else {
                throw new Error('Invalid email or password');
            }
        });
    };

    const signup = (email, password, name) => {
        return fetch('https://ireporter-server.onrender.com/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        });
    };

    const verifyToken = (email, token) => {
        return fetch('https://ireporter-server.onrender.com/verify_token', {    
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, token })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        });
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        setUser(null);
    };

    const updateUserProfile = (profileData) => {
        const token = localStorage.getItem('access_token');
        const formData = new FormData();

        // Directly append values to formData if they exist
        if (profileData.name) formData.append('name', profileData.name);
        if (profileData.email) formData.append('email', profileData.email);
        if (profileData.old_password) formData.append('old_password', profileData.old_password);
        if (profileData.new_password) formData.append('new_password', profileData.new_password);
        if (profileData.image) formData.append('image', profileData.image);

        return fetch('https://ireporter-server.onrender.com/users', {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`
                // 'Content-Type': 'multipart/form-data' // Not needed with FormData
            },
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Update the user context with the updated profile
            setUser(prevUser => ({
                ...prevUser,
                name: profileData.name || prevUser.name,
                email: profileData.email || prevUser.email,
                image: profileData.image ? URL.createObjectURL(profileData.image) : prevUser.image
            }));
            return data;
        })
        .catch(error => {
            console.error('Error updating profile:', error);
            throw error; // Re-throw to handle in the component
        });
    };

    const updateTokenVerified = (userId, tokenVerified) => {
        return fetch(`https://ireporter-server.onrender.com/admin/users/${userId}/update-token`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify({ token_verified: tokenVerified })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        });
    };


    if (loading) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, signup, verifyToken, updateUserProfile, updateTokenVerified }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;