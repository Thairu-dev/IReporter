import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './Login';
import UserDashboard from './User/UserDashboard';
import AdminDashboard from './Admin/AdminDashboard';
import ProtectedRoute from './ProtectedRoute';
import Home from './Home';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/user-dashboard" element={<ProtectedRoute element={UserDashboard}/>} />
                    <Route path="/admin-dashboard" element={<ProtectedRoute element={AdminDashboard} />} />
                    <Route path="/" element={<Home/>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;