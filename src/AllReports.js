//import React from 'react';
//import CountUp from 'react-countup';
//import { Bar } from 'react-chartjs-2';
//import { Chart, registerables } from 'chart.js';
//import './AllReports.css';
//
//Chart.register(...registerables);
//
//const AllReports = () => {
//  const stats = {
//    redflags: 1150,
//    interventions: 595,
//    resolved: 1031,
//  };
//
//  const data = {
//    labels: ["Redflags", "Interventions", "Resolved"],
//    datasets: [
//      {
//        label: "Reports",
//        data: [stats.redflags, stats.interventions, stats.resolved],
//        backgroundColor: [
//          "rgba(142, 36, 170, 0.2)",
//          "rgba(54, 162, 235, 0.2)",
//          "rgba(128, 128, 128, 0.2)",
//        ],
//        borderColor: ["#bc43de ", "#b7b9c6", "grey"],
//        borderWidth: 1,
//      },
//    ],
//  };
//
//  const options = {
//    scales: {
//      y: {
//        beginAtZero: true,
//      },
//    },
//  };
//
//  return (
//    <div className="all-reports-container">
//      <h2 className="section-title">General Reports Overview</h2>
//      <div className="report-stats">
//        <div className="report-card">
//          <h3>Total Redflags</h3>
//          <CountUp start={0} end={stats.redflags} duration={2.5} />
//        </div>
//        <div className="report-card">
//          <h3>Total Interventions</h3>
//          <CountUp start={0} end={stats.interventions} duration={2.5} />
//        </div>
//        <div className="report-card">
//          <h3>Total Resolved Issues</h3>
//          <CountUp start={0} end={stats.resolved} duration={2.5} />
//        </div>
//      </div>
//      <div className="chart-container">
//        <Bar data={data} options={options} />
//      </div>
//
//    </div>
//  );
//};
//
//export default AllReports;