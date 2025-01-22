// Dashboard.js
import React from 'react';
import '../styles/Dash.css';
import useUserProfile from '../components/DashboardAuth';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const Dashboard = ({ toggleSidebar, isSidebarHidden, isDarkMode, toggleDarkMode, isSearchFormShown, handleSearchButtonClick }) => {
  const { userProfile, errorMessage } = useUserProfile();

  return (
    <section id="dashboard">
      <Sidebar isSidebarHidden={isSidebarHidden} />
      <section id="content">
        <Navbar toggleSidebar={toggleSidebar} isSearchFormShown={isSearchFormShown} handleSearchButtonClick={handleSearchButtonClick} toggleDarkMode={toggleDarkMode} />
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Dashboard</h1>
              <ul className="breadcrumb">
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><i className="bx bx-chevron-right"></i></li>
                <li><Link to="#" className="active">Home</Link></li>
              </ul>
            </div>
            <a href="#" className="btn-download"><i className="bx bxs-cloud-download"></i><span className="text">Download PDF</span></a>
          </div>
          <div className="profile-message">
            <h3>{userProfile?.message || errorMessage || 'Loading profile...'}</h3>
          </div>
          <ul className="box-info">
            {['New Orders', 'Visitors', 'Total Sales'].map((text, index) => (
              <li key={index}>
                <i className={`bx bxs-${['calendar-check', 'group', 'dollar-circle'][index]}`}></i>
                <span className="text">
                  <h3>{[1020, 2834, '$2543'][index]}</h3>
                  <p>{text}</p>
                </span>
              </li>
            ))}
          </ul>
          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Recent Orders</h3>
                <i className="bx bx-search"></i><i className="bx bx-filter"></i>
              </div>
              <table>
                <thead><tr><th>User</th><th>Date Order</th><th>Status</th></tr></thead>
                <tbody>
                  {['Completed', 'Pending', 'Process'].map((status, index) => (
                    <tr key={index}>
                      <td><img src="img/people.png" alt="User" /><p>John Doe</p></td>
                      <td>01-10-2021</td>
                      <td><span className={`status ${status.toLowerCase()}`}>{status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="todo">
              <div className="head">
                <h3>To-Dos</h3>
                <i className="bx bx-plus-circle"></i><i className="bx bx-filter"></i>
              </div>
              <ul className="todo-list">
                {['Finish Dashboard Design', 'Fix Search Functionality', 'Implement API for Analytics', 'Review New User Feedback'].map((task, index) => (
                  <li key={index} className="completed">
                    <p>{task}</p><i className="bx bx-check-circle"></i>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </section>
    </section>
  );
};

export default Dashboard;
