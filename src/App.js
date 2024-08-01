import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './Login';
import UserDashboard from './User/UserDashboard';
import AdminDashboard from './Admin/AdminDashboard';
import ProtectedRoute from './ProtectedRoute';
<<<<<<< HEAD
import Home from './Home'; 
import SignupForm from './SignUpForm';
=======
import Home from './Home';
import Navbar from './NavBar';
>>>>>>> 9b639fb4c536da5223db3433abcd17f92faef400

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Navbar/>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/user-dashboard" element={<ProtectedRoute element={UserDashboard}/>} />
                    <Route path="/admin-dashboard" element={<ProtectedRoute element={AdminDashboard} />} />
                    <Route path="/" element={<Home/>} />
                    <Route path="/signup" element={<SignupForm />} />

                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;