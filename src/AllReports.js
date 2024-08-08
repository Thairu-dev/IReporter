import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './AllReports.css';

Chart.register(...registerables);

const AllReports = () => {
  const [sumRedFlags, setSumRedFlags] = useState(0);
  const [sumInterventions, setSumInterventions] = useState(0);
  const [sumResolved, setSumResolved] = useState(0);

  useEffect(() => {
    // Fetch red flags count and resolved count
    fetch("https://ireporter-server.onrender.com/redflags")
      .then((response) => response.json())
      .then((data) => {
        const resolvedRedFlags = data.filter(flag => flag.status === 'resolved').length;
        setSumRedFlags(data.length);
        setSumResolved(prevResolved => prevResolved + resolvedRedFlags);
      })
      .catch((error) => console.error("Error fetching redflags:", error));

    // Fetch interventions count and resolved count
    fetch("https://ireporter-server.onrender.com/interventions")
      .then((response) => response.json())
      .then((data) => {
        const resolvedInterventions = data.filter(intervention => intervention.status === 'resolved').length;
        setSumInterventions(data.length);
        setSumResolved(prevResolved => prevResolved + resolvedInterventions);
      })
      .catch((error) => console.error("Error fetching interventions:", error));
  }, []);

  const stats = {
    redflags: sumRedFlags,
    interventions: sumInterventions,
    resolved: sumResolved,
  };

  const data = {
    labels: ["Redflags", "Interventions", "Resolved"],
    datasets: [
      {
        label: "Reports",
        data: [stats.redflags, stats.interventions, stats.resolved],
        backgroundColor: [
          "rgba(142, 36, 170, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(128, 128, 128, 0.2)",
        ],
        borderColor: ["#bc43de", "#b7b9c6", "grey"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="all-reports-container">
      <h2 className="section-title">General Reports Overview</h2>
      <div className="report-stats">
        <div className="report-card">
          <h3>Total Redflags</h3>
          <CountUp start={0} end={stats.redflags} duration={2.5} />
        </div>
        <div className="report-card">
          <h3>Total Interventions</h3>
          <CountUp start={0} end={stats.interventions} duration={2.5} />
        </div>
        <div className="report-card">
          <h3>Total Resolved Issues</h3>
          <CountUp start={0} end={stats.resolved} duration={2.5} />
        </div>
      </div>
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default AllReports;

