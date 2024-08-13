import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <span role="img" aria-label="eye" className="logo-emoji">👁️</span>
          <span className="logo-text">
            {'Reporter'.split('').map((letter, index) => (
              <span key={index} className="logo-letter">{letter}</span>
            ))}
          </span>
        </Link>
        <button className="hamburger-menu" onClick={toggleMenu}>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </button>
        <ul className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          {user ? (
            <>
             <li className="navbar-link">
                <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
              </li>
              

              {user.role === 'admin' && (
                <>
                <li className="navbar-link">
                  <NavLink to="/admin-dashboard" className={({ isActive }) => isActive ? "active" : ""}>Admin Dashboard</NavLink>
                </li>
                <li className="navbar-link">
                <NavLink to="/adminredflags" className={({ isActive }) => isActive ? "active" : ""}>Redflags</NavLink>
              </li>
              <li className="navbar-link">
                <NavLink to="/admininterventions" className={({ isActive }) => isActive ? "active" : ""}>Interventions</NavLink>
              </li>
              <li className="navbar-link">
                  <NavLink to="/analytics" className={({ isActive }) => isActive ? "active" : ""}>Analytics</NavLink>
                </li>
                </>
              )}
              {user.role === 'user' && (
                <>
                <li className="navbar-link">
                  <NavLink to="/user-dashboard" className={({ isActive }) => isActive ? "active" : ""}>User Dashboard</NavLink>
                </li>
                <li className="navbar-link">
                <NavLink to="/redflags" className={({ isActive }) => isActive ? "active" : ""}>Redflags</NavLink>
                </li>
                <li className="navbar-link">
                <NavLink to="/interventions" className={({ isActive }) => isActive ? "active" : ""}>Interventions</NavLink>
              </li>
                </>
              )}
              <li className="navbar-link">
                <NavLink to="/" onClick={logout} className={({ isActive }) => isActive ? "active" : ""}>Logout</NavLink>
              </li> 
              
            </>
          ) : (
            <>
              <li className="navbar-link">
                <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
              </li>
              <li className="navbar-link">
                <NavLink to="/all-reports" className={({ isActive }) => isActive ? "active" : ""}>All Reports</NavLink>
              </li>
              <li className="navbar-link">
                <NavLink to="/sign-up" className={({ isActive }) => isActive ? "active" : ""}>Sign Up</NavLink>
              </li>
              <li className="navbar-link" id="login">
                <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>Login</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;