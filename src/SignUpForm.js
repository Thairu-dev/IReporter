import React from 'react'
import {Link} from 'react-router-dom';

function SignUpForm() {
  return (
    <div className='row'>
      
        <section className='sign in column center' >
        <Link to="/" className="home-icon"><i className="fas fa-home" /></Link>
          <h2 >
                    <span className="primary-text">i</span>
                    Reporter
                  </h2>
         <p className="hint">Fill the form below to create an account</p>
      <hr className="dash" />
      <div className="input-wrapper">
        
        <input
          type="text"
          name="firstname"
          placeholder="First name"
          minLength="3"
          required
        //   onChange={event => handleFieldChange(event)}
        />
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          name="lastname"
          placeholder="Last name"
          minLength="3"
          required
        //   onChange={event => handleFieldChange(event)}
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
        //   onChange={event => handleFieldChange(event)}
        />
      </div>
      <div className="input-wrapper">
        <input
          type="email"
          name="email"
          placeholder="Email address"
          pattern="^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$"
        //   onChange={event => handleFieldChange(event)}
        />
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
        //   onChange={event => handleFieldChange(event)}
        />
        
      </div>
      
      {/* <button type="submit" className="btn-register">REGISTER</button>
      <div className="row center">
                    <div className="row signin--or">
                      <span>or</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn-signin"
                    > SIGN IN
                  </button> */}
                  <div class="container">
  <div>
    <button class="log">Sign up</button>
    <div className="row center">
                    <div className="row signin--or">
                      <span>or</span>
                    </div>
                  </div>
    <button class="reg">Sign in</button>
    
  </div>
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
                <span className="primary-text">iReporter</span>
                {' '}
                is a platform for every citizens
              </h4>
            </div>
          </section>
    </div>
        );
};
export default SignUpForm;
