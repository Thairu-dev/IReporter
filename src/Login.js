import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        login(email, password)
            .then((userData) => {
                console.log(userData)
                if (userData) {
                    // Redirect based on user role
                    if (userData.role === 'admin') {
                        navigate('/admin-dashboard');
                    } else if(userData.role === 'user') {
                        navigate('/user-dashboard');
                    }else{
                        alert("You must be a user")
                    }
                }
            })
            .catch(() => {
                setError('Invalid email or password');
            });
    };

    return (
        
        <div className="row">
            <section className='sign in column center' >
             <Link to="/" className="home-icon"><i className="fas fa-home" /></Link>
          <h2 >
                    <span className="primary-text">👁️</span>
                    Reporter
                  </h2>
            
            <form className='signup--form' onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    /> 
                </div>
                <br></br>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <br></br>
                {error && <p className="error">{error}</p>}
                <button className='log' type="submit">Login</button>
                
            </form>
            
            <div>
            
            <br></br>
                                <div className="signin--links">
                                    <a href="#!">Forgot Password</a>
                                </div>
            <div className="row center">
                            <div className="row signin--or">
                                
                            <span>or</span>
                            </div>
                        </div>
            <button onClick={() => navigate("/sign-up")} class="reg">Sign up</button>
            
             </div> 
       
             </section>
             <section className="showcase column center">
            <div className="showcase--content">
              <h1>
                Let&rsquo;s build the Nation
                {' '}
                <strong>together</strong>
              </h1>
              <h4>
                <span className="primary-text">👁️Reporter</span>
                {' '}
                is a platform for every citizen.
              </h4>
            </div>
          </section>   
            
        </div>
    );
};

export default Login;