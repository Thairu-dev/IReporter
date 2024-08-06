import React, { createContext, useState, useContext, useEffect } from 'react';
import "../Spinner.css"

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

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, signup, verifyToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;