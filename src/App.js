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
import RedFlagsCard from './RedFlagsCard';
<<<<<<< HEAD
import InterventionsCard from './InterventionsCard';
=======
import AdminRedflags from './Admin/AdminRedflags';
import AdminInterventions from './Admin/AdminInterventions';
>>>>>>> f9068dc0d17bd66c5998ecb2700a984f6892930a


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
<<<<<<< HEAD
                    <Route path="/interventions" element={<ProtectedRoute element={InterventionsCard} />} />
                    {/* <Route path='/interventions' element={<InterventionsCard/>}/> */}
=======
                    <Route path="/adminredflags" element={<ProtectedRoute element={AdminRedflags} />} />
                    <Route path="/admininterventions" element={<ProtectedRoute element={AdminInterventions} />} />
>>>>>>> f9068dc0d17bd66c5998ecb2700a984f6892930a
                    
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;