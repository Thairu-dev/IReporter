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
// import RedflagsPage from './RedFlags';
import RedFlagsCard from './User/UserRedFlagsCard';
import InterventionsCard from './User/UserInterventionsCard';
import AdminRedflags from './Admin/AdminRedflags';
import AdminInterventions from './Admin/AdminInterventions';
import AddRedFlag from './User/AddRedFlag';
import AddIntervention from './User/AddIntervention';
import AllReports from './AllReports'
import ReportCards from './ReportsCard';
import UserProfilePage from './User/UserProfilePage';
import AdminProfilePage from './Admin/AdminProfilePage';
import AdminUserManagement from './Admin/AdminUserManagenent';




const App = () => {
    return (
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/user-dashboard"
              element={<ProtectedRoute element={UserDashboard} />}
            />
            <Route
              path="/admin-dashboard"
              element={<ProtectedRoute element={AdminDashboard} />}
            />
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignupForm />} />
            <Route
              path="/redflags"
              element={<ProtectedRoute element={RedFlagsCard} />}
            />
            <Route
              path="/interventions"
              element={<ProtectedRoute element={InterventionsCard} />}
            />
            <Route
              path="/adminredflags"
              element={<ProtectedRoute element={AdminRedflags} />}
            />
            <Route
              path="/analytics"
              element={<ProtectedRoute element={AllReports} />}
            />
            <Route
              path="/admininterventions"
              element={<ProtectedRoute element={AdminInterventions} />}
            />
            <Route path="addredflag" element={<ProtectedRoute element={AddRedFlag} />} />
            <Route
              path="/addintervention"
              element={<ProtectedRoute element={AddIntervention} />}
            />
           <Route path="/all-reports" element={<ReportCards />} />
           <Route path='/user-profile' element={<ProtectedRoute element={UserProfilePage}/>}/>
           <Route
              path="/admin-profile"
              element={<ProtectedRoute element={AdminProfilePage} />}
            />
            <Route
              path="/user-management"
              element={<ProtectedRoute element={AdminUserManagement} />}
            />
          </Routes>
        </Router>
      </AuthProvider>
    );
};

export default App;