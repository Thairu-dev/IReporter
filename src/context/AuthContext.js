import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state to manage async checks

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
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    setUser(data);
                } else {
                    localStorage.removeItem('access_token');
                }
            })
            .catch(() => {
                localStorage.removeItem('access_token');
            })
            .finally(() => setLoading(false)); // Set loading to false after check is complete
        } else {
            setLoading(false); // Set loading to false if no token is found
        }
    }, []);

    const login = (email, password) => {
        return fetch('https://ireporter-server.onrender.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
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
                .then(response => response.json())
                .then(userData => {
                    if (userData.id) {
                        setUser(userData);
                        return userData;
                    } else {
                        throw new Error('Failed to fetch user details');
                    }
                });
            } else {
                throw new Error('Invalid email or password');
            }
        });
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        setUser(null);
    };

    if (loading) {
        return <div>Loading...</div>; // Optionally show a loading spinner or message while checking session
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;