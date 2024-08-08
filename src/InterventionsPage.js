import React, { useEffect, useState } from 'react';
import './Redflags.css'; // Make sure to create a CSS file to style the component
import Map from './InterventionsMap';
import { useNavigate } from 'react-router-dom';


const InterventionsPage = () => {
  const [reports, setReports] = useState([]);
  const [sortOption, /*setSortOption*/] = useState('status'); // Default sorting option
  //const [selectedOption, setSelectedOption] = useState('reports');
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // Fetch reports data from the API
    fetch("https://ireporter-server.onrender.com/interventions")
      .then((response) => response.json())
      .then((data) => {
        // Assuming data is an array of intervention objects
        setReports(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Function to handle sorting
  const sortReports = (reports, option) => {
    return [...reports].sort((a, b) => {
      if (option === 'status') {
        // Sorting alphabetically by status
        return a.status.localeCompare(b.status);
      } else if (option === 'date') {
        // Sorting by date (assuming date is in a sortable format)
        return new Date(b.date_added) - new Date(a.date_added);
      }
      return 0;
    });
  };
 
  
  // Sorted reports
  const sortedReports = sortReports(reports, sortOption);

  // Function to handle report click
  const handleReportClick = () => {
    // Navigate to a different page with reportId in the URL
    navigate('/admininterventions' );
  };

  return (
    <div className="reports-page">
      <div className="sidebar">
        <h2 style={{fontFamily:"sans-serif"}}>Admin Dashboard</h2>
        <div className="report-list">
          {sortedReports.map((report) => (
            <div key={report.id} className="report" onClick={() => handleReportClick()}>
              <div className="report-header">
                <span className="report-title">Description:{report.intervention}</span>
                <span className="report-time">Date:{report.date_added}</span>
              </div>
              <div className={`report-status ${report.status.toLowerCase()}`}>
                Status:{report.status}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="map">
        <Map />
      </div>
    </div>
  );
};

export default InterventionsPage;
