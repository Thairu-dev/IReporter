import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './Login';
import UserDashboard from './User/UserDashboard';
import AdminDashboard from './Admin/AdminDashboard';
import ProtectedRoute from './ProtectedRoute';
import Home from './Home'; 
import SignupForm from './SignUpForm';
import Navbar from './NavBar';
import RedFlagsCard from './User/UserRedFlagsCard';
import InterventionsCard from './User/UserInterventionsCard';
import AdminRedflags from './Admin/AdminRedflags';
import AdminInterventions from './Admin/AdminInterventions';
import AddRedFlag from './AddRedFlag';



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
                    <Route path="/sign-up" element={<SignupForm />} />
                    <Route path="/redflags" element={<ProtectedRoute element={RedFlagsCard} />} />
                    <Route path="/interventions" element={<ProtectedRoute element={InterventionsCard} />} />
                    <Route path="/adminredflags" element={<ProtectedRoute element={AdminRedflags} />} />
                    <Route path="/admininterventions" element={<ProtectedRoute element={AdminInterventions} />} />
                    <Route path='addredflag' element={<AddRedFlag/>} />
                    
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;