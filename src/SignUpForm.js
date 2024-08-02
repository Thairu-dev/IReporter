import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import PropType from 'prop-types';
import PasswordInput from './Inputs/PasswordInputs';



// function SignUpForm() {
 
  const SignUpForm = (props) => {
    const initialState = {
      firstname: '',
      lastname: '',
      othernames: '',
      phoneNumber: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    };
    const [formData, setFormData] = useState(initialState);
  
    const handleFieldChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const { handleSignUp } = props;
      handleSignUp(formData);
    };
    const navigate = useNavigate();
  return (
    <div className='row'>
      
        <section className='sign in column center' >
        <Link to="/" className="home-icon"><i className="fas fa-home" /></Link>
          <h2 >
                    <span className="primary-text">👁️</span>
                    Reporter
                  </h2>
               <form>  
         <p className="hint">Fill the form below to create an account</p>
      <hr className="dash" />
      <div className="input-wrapper">
        
        <input
          type="text"
          name="firstname"
          placeholder="First name"
          minLength="3"
          required
          onChange={event => handleFieldChange(event)}
        />
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          name="lastname"
          placeholder="Last name"
          minLength="3"
          required
          onChange={event => handleFieldChange(event)}
        />
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          name="phoneNumber"
          id="phonenumber"
          placeholder="Phone number"
          minLength="11"
          required
          onChange={event => handleFieldChange(event)}
        />
      </div>
      <div className="input-wrapper">
        <input
          type="email"
          name="email"
          placeholder="Email address"
          pattern="^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$"
          onChange={event => handleFieldChange(event)}
        />
      </div>
      
      <PasswordInput
        name="password"
        placeholder="Password"
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        title="Please include at least 1 uppercase character, 1 lowercase character, and 1 number."
        minLength="6"
        handleOnChange={event => handleFieldChange(event)}
      />
      <PasswordInput
        name="passwordConfirmation"
        placeholder="Repeat password"
        handleOnChange={event => handleFieldChange(event)}
      />
     
     
                  <div class="container">
            <div>
              <button className="reg">Sign up</button>
              <div className="row center">
                              <div className="row signin--or">
                                <span>or</span>
                              </div>
                            </div>
              <button onClick={() => navigate("/login")} className="log">Login</button>
              
            </div>
            
          </div>
          </form>
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
      SignUpForm.propTypes = {
        handleSignUp: PropType.func.isRequired,
      };

export default SignUpForm;

