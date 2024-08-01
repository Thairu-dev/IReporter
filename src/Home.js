import React from 'react';
import './HowItWorks.css'; // Import a CSS file for additional styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faMapMarkerAlt, faPhotoVideo } from '@fortawesome/free-solid-svg-icons';
export default function Home() {
  const currentYear = new Date().getFullYear(); 
  return (
    <div>
      <section
        style={{
          backgroundImage: `
            linear-gradient(to right bottom, rgba(32, 38, 57, 0.5), rgba(63, 76, 119, 0.8)),
            url('https://images.unsplash.com/photo-1627676569762-ea59379ed3b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmFpc2VkJTIwaGFuZHN8ZW58MHx8MHx8fDA%3D')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: 'calc(100vh - 74px)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <h1>MAKE YOUR VOICE COUNT</h1>
        <div>
          <p className="homepage-message">
            iReporter helps to empower citizens to report corruption and incidents requiring government intervention. 
          </p>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How it works</h2>
        <p>In 3 easy steps you can easily report corruption cases and seek government intervention.</p>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <p>Create and submit a red flag or intervention record. Set a title, attach images/videos and input your location.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <p>Your record gets submitted to the appropriate authority and process is put in place to start reviewing your record.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <p>Your record gets reviewed and you get real-time email feedback upon completion of the reviews.</p>
          </div>
        </div>
      </section>

      <section className="top-features">
        <h2>Top Features</h2>
        <div className="features">
          <div className="feature">
            <div className="feature-icon">
              {/* Use an icon component or img here */}
              <FontAwesomeIcon icon={faBell} />
            </div>
            <p>Receive real-time email and SMS notifications immediately your report has been resolved.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">
              {/* Use an icon component or img here */}
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </div>
            <p>Set the location you are reporting from. You can either choose to enter an address or select your current location.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">
              {/* Use an icon component or img here */}
              <FontAwesomeIcon icon={faPhotoVideo} />
            </div>
            <p>Ability to add media (photos and videos) attachments to help validate your report.</p>
          </div>
        </div>
      </section>
      <footer
        style={{
          backgroundColor: 'aliceblue',
          padding: '10px',
          height:'50px',
          justifyContent: 'center',
          position: 'relative',
          bottom: '0',
          width: '100%',
          color: '#333',
          display:'flex',
          boxSizing:'border-box'
        }}
      >
        <p>&copy; {currentYear} iReporter. All rights reserved.</p>
      </footer>
    </div>
  );
}
