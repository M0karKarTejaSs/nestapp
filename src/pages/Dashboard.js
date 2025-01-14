import React from "react";
import "../App.css";

const Dashboard = () => {
  const dummyData = [
    { title: "Total Books", value: 120 },
    { title: "Registered Users", value: 25 },
  ];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Welcome to Your Book Inventory Management System</h2>
      
      <div className="cards-container">
        {dummyData.map((data, index) => (
          <div className="card" key={index}>
            <h3>{data.title}</h3>
            <p className="card-value">{data.value}</p>
          </div>
        ))}
      </div>
      <div className="note-container">
        <p className="note-text">Note: The data displayed here is dummy data for testing purposes.</p>
      </div>
      <footer className="footer">
        <p>Created with ❤️ by <strong>Tech Titans</strong></p>
      </footer>
    </div>
  );
};

export default Dashboard;
