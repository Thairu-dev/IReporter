import React, { useEffect, useState } from 'react';
import './Redflags.css'; // Make sure to create a CSS file to style the component
import Map from './InterventionsMap';

const RedflagsPage = () => {
  const [reports, setReports] = useState([]);
  const [sortOption, setSortOption] = useState('status'); // Default sorting option

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

  // Handle sorting option change
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Sorted reports
  const sortedReports = sortReports(reports, sortOption);

  return (
    <div className="reports-page">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <div className="filters">
          <label htmlFor="reportFilter">Reports About</label>
          <select id="reportFilter">
            <option value="everything">Everything</option>
            {/* Add more filter options as needed */}
          </select>
          <label htmlFor="sortBy">Sort by</label>
          <select id="sortBy" value={sortOption} onChange={handleSortChange}>
            <option value="status">Status</option>
            <option value="date">Date</option>
            {/* Add more sort options as needed */}
          </select>
        </div>
        <div className="report-list">
          {sortedReports.map((report) => (
            <div key={report.id} className="report">
              <div className="report-header">
                <span className="report-title">{report.intervention}</span>
                <span className="report-time">{report.date_added}</span>
              </div>
              <div className={`report-status ${report.status.toLowerCase()}`}>
                {report.status}
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

export default RedflagsPage;