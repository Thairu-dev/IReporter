import React, { useEffect, useState } from 'react';
//import "./Userspinner.css"; // Include your spinner styles if needed
import './ReportCard.css'
const ReportCards = () => {
    const [selectedOption, setSelectedOption] = useState('redflags');
    const [reports, setReports] = useState([]);
    const [error, setError] = useState('');

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
            <h2>{selectedOption === 'redflags' ? 'Red Flags' : 'Interventions'}</h2>
            <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                <option value="redflags">Red Flags</option>
                <option value="interventions">Interventions</option>
            </select>
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReportCards;
