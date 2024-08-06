import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from './Inputs/PasswordInputs';
import { useAuth } from './context/AuthContext';

const SignUpForm = () => {
    const initialState = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        role: 'User', // Default role
    };

    const [formData, setFormData] = useState(initialState);
    const [token, setToken] = useState('');
    const [step, setStep] = useState(1); // Step 1: Sign up, Step 2: Verify
    const [error, setError] = useState(''); // State to manage error messages
    const navigate = useNavigate();
    const { signup, verifyToken } = useAuth();

    const handleFieldChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        const { firstname, lastname, email, password, role } = formData;
        const name = `${firstname} ${lastname}`;
        signup(email, password, name, role) // Include role in the signup call
            .then(() => {
                setStep(2); // Move to verification step on successful signup
                setError(''); // Clear any previous errors
            })
            .catch(error => {
                console.error(error);
                setError('Failed to sign up. Please try again.'); // Show error message
            });
    };

    const handleVerify = (e) => {
        e.preventDefault();
        const { email } = formData;
        verifyToken(email, token)
            .then(response => {
                if (response.message === "Token verified successfully.") {
                    navigate('/login'); // Navigate to login on successful verification
                } else {
                    setError('Invalid verification token. Please try again.'); // Show error message
                }
            })
            .catch(error => {
                console.error(error);
                setError('Verification failed. Please try again.'); // Show error message
            });
    };

    return (
        <div className='row'>
            <section className='sign in column center'>
                <Link to="/" className="home-icon"><i className="fas fa-home" /></Link>
                <h2>
                    <span className="primary-text">👁️</span>
                    Reporter
                </h2>
                <form onSubmit={step === 1 ? handleSignup : handleVerify}>
                    <p className="hint">Fill the form below to create an account</p>
                    <hr className="dash" />
                    {error && <p className="error-message">{error}</p>}
                    {step === 1 ? (
                        <>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    name="firstname"
                                    placeholder="First name"
                                    minLength="3"
                                    required
                                    onChange={handleFieldChange}
                                />
                            </div>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    name="lastname"
                                    placeholder="Last name"
                                    minLength="3"
                                    required
                                    onChange={handleFieldChange}
                                />
                            </div>
                            <div className="input-wrapper">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email address"
                                    pattern="^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$"
                                    onChange={handleFieldChange}
                                />
                            </div>
                            <PasswordInput
                                name="password"
                                placeholder="Password"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Please include at least 1 uppercase character, 1 lowercase character, and 1 number."
                                minLength="6"
                                handleOnChange={handleFieldChange}
                            />
                            <PasswordInput
                                name="passwordConfirmation"
                                placeholder="Repeat password"
                                handleOnChange={handleFieldChange}
                            />
                            <div className="input-wrapper">
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleFieldChange}
                                    required
                                >
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                    
                                </select>
                            </div>
                            <div className="container">
                                <div>
                                    <button className="reg" type="submit">Sign up</button>
                                    <div className="row center">
                                        <div className="row signin--or">
                                            <span>or</span>
                                        </div>
                                    </div>
                                    <button type="button" onClick={() => navigate("/login")} className="log">Login</button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    placeholder="Verification Token"
                                    value={token}
                                    onChange={(e) => setToken(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="container">
                                <div>
                                    <button className="reg" type="submit">Verify</button>
                                </div>
                            </div>
                        </>
                    )}
                </form>
            </section>
            <section className="showcase column center">
                <div className="showcase--content">
                    <h1>
                        Let&rsquo;s build the Nation <strong>together</strong>
                    </h1>
                    <h4>
                        <span className="primary-text">👁️Reporter</span> is a platform for every citizen.
                    </h4>
                </div>
            </section>
        </div>
    );
};

export default SignUpForm;
