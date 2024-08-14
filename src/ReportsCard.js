import React, { useEffect, useState } from 'react';
//import "./Userspinner.css"; // Include your spinner styles if needed
import './ReportCard.css'
import VideoModal from './VideoModal';
const ReportCards = () => {
    const [selectedOption, setSelectedOption] = useState('redflags');
    const [reports, setReports] = useState([]);
    const [error, setError] = useState('');
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState('');
    useEffect(() => {
        const fetchReports = () => {
            const endpoint = selectedOption === 'redflags' 
                ? 'https://ireporter-server.onrender.com/redflags' 
                : 'https://ireporter-server.onrender.com/interventions';
            
            fetch(endpoint)
                .then(response => response.json())
                .then(data => setReports(data))
                .catch(() => setError('An error occurred while fetching the reports'));
        };

        fetchReports();
    }, [selectedOption]);

    const handleVideoOpen = (videoUrl) => {
        setCurrentVideoUrl(videoUrl);
        console.log(videoUrl)
        setIsVideoOpen(true);
    };

    const handleVideoClose = () => {
        setIsVideoOpen(false);
        setCurrentVideoUrl('');
    };

    if (error) {
        return <p className="error">{error}</p>;
    }

    if (reports.length === 0) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
                <p>No reports available.</p>
            </div>
        );
    }

    return (
        <div className='reports-container'>
            <h2 className='reports-heading'>All Reports</h2>
            <div className="reports-dropdown">
        <span className="dropdown-label">Reports About:</span>
        <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                <option value="redflags">Red Flags</option>
                <option value="interventions">Interventions</option>
            </select>
        </div>

            <div className='cards-container'>
                {reports.map((report) => (
                    <div key={report.id} className="ui card">
                        <div className="image">
                            <img src={report.image || "https://via.placeholder.com/150"} alt={report.title} />
                        </div>
                        <div className="content">
                            <div className="header">
                                Title:{report.intervention || report.redflag}</div>
                            <div className="meta">
                            <p><strong>Description:</strong> {report.description}</p>
                            <p><strong>Date:</strong> {report.date_added.split(" ")[0]}</p>
                            <p><strong>Time:</strong> {report.date_added.split(" ")[1]}</p>
                                </div>
                        </div>
                        <div className="extra content">
                        <p><strong>Status:</strong> <span className={`status-${report.status.toLowerCase()}`}>{report.status}</span></p>
                        </div>
                    <div className="extra content">Geolocation : {report.geolocation}</div>
                    <div className='card-btn'>
                {/*redflg.video && */(
                    <button onClick={() => handleVideoOpen(report.video)}>Play Video</button>
                )}
                </div>
                    </div>
                ))}
            </div>
            <VideoModal 
                isOpen={isVideoOpen} 
                onClose={handleVideoClose} 
                videoUrl={currentVideoUrl} 
            />
        </div>
      
    );
};

export default ReportCards;
