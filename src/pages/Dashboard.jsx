import React from 'react';
import '../styles/Dash.css';
import { Link } from 'react-router-dom';
import handleLogout from "../components/Logout"
import useUserProfile from '../components/DashboardAuth';

const Dashboard = ({
  toggleSidebar,
  isSidebarHidden,
  isDarkMode,
  toggleDarkMode,
  isSearchFormShown,
  handleSearchButtonClick,
}) => {
  const { userProfile, errorMessage } = useUserProfile(); // Using the custom hook to get user data

  return (
    <section id="dashboard">
      {/* SIDEBAR */}
      <section id="sidebar" className={isSidebarHidden ? 'hide' : ''}>
        <a href="#" className="brand">
          <i className="bx bxs-smile"></i>
          <span className="text">AdminHub</span>
        </a>
        <ul className="side-menu top">
          <li className="active">
            <Link to="#">
              <i className="bx bxs-dashboard"></i>
              <span className="text">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/genre">
              <i className="bx bxs-shopping-bag-alt"></i>
              <span className="text">Genre</span>
            </Link>
          </li>
          <li>
            <Link to="#">
              <i className="bx bxs-doughnut-chart"></i>
              <span className="text">Analytics</span>
            </Link>
          </li>
          <li>
            <Link to="#">
              <i className="bx bxs-message-dots"></i>
              <span className="text">Message</span>
            </Link>
          </li>
          <li>
            <Link to="#">
              <i className="bx bxs-group"></i>
              <span className="text">Team</span>
            </Link>
          </li>
        </ul>
        <ul className="side-menu">
          <li>
            <Link to="#">
              <i className="bx bxs-cog"></i>
              <span className="text">Settings</span>
            </Link>
          </li>
          {/* <li>
            <Link to="#" className="logout">
              <i className="bx bxs-log-out-circle"></i>
            </Link>
          </li> */}
          <li>
            <Link to="#" className="logout" onClick={handleLogout}>
              <i className="bx bxs-log-out-circle"></i>
            </Link>
          </li>
        </ul>
      </section>
      {/* SIDEBAR */}

      {/* CONTENT */}
      <section id="content">
        {/* NAVBAR */}
        <nav>
          <i className="bx bx-menu" onClick={toggleSidebar}></i>
          <a href="#" className="nav-link">
            Dashboard
          </a>
          <form action="#" className={isSearchFormShown ? 'show' : ''}>
            <div className="form-input">
              <input type="search" placeholder="Search..." />
              <button type="submit" className="search-btn" onClick={handleSearchButtonClick}>
                <i className={`bx ${isSearchFormShown ? 'bx-x' : 'bx-search'}`}></i>
              </button>
            </div>
          </form>
          <input type="checkbox" id="switch-mode" hidden />
          <label htmlFor="switch-mode" className="switch-mode" onClick={toggleDarkMode}></label>
          <a href="#" className="notification">
            <i className="bx bxs-bell"></i>
            <span className="num">8</span>
          </a>
          <a href="#" className="profile">
            <img src="img/people.png" alt="profile" />
          </a>
        </nav>
        {/* NAVBAR */}

        {/* MAIN */}
        <main>
          {/* HEADER */}
          <div className="head-title">
            <div className="left">
              <h1>Dashboard</h1>
              <ul className="breadcrumb">
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>
                </li>
                <li>
                  <Link to="#" className="active">
                    Home
                  </Link>
                </li>
              </ul>
            </div>
            <a href="#" className="btn-download">
              <i className="bx bxs-cloud-download"></i>
              <span className="text">Download PDF</span>
            </a>
          </div>
          {/* DISPLAY PROFILE MESSAGE */}
          <div className="profile-message">
            {userProfile ? (
              <h3>{userProfile.message}</h3>
            ) : (
              <p>{errorMessage || 'Loading profile...'}</p>
            )}
          </div>

          {/* STATISTICS */}
          <ul className="box-info">
            <li>
              <i className="bx bxs-calendar-check"></i>
              <span className="text">
                <h3>1020</h3>
                <p>New Orders</p>
              </span>
            </li>
            <li>
              <i className="bx bxs-group"></i>
              <span className="text">
                <h3>2834</h3>
                <p>Visitors</p>
              </span>
            </li>
            <li>
              <i className="bx bxs-dollar-circle"></i>
              <span className="text">
                <h3>$2543</h3>
                <p>Total Sales</p>
              </span>
            </li>
          </ul>

          {/* DATA TABLES */}
          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Recent Orders</h3>
                <i className="bx bx-search"></i>
                <i className="bx bx-filter"></i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Date Order</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img src="img/people.png" alt="John Doe" />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <span className="status completed">Completed</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src="img/people.png" alt="John Doe" />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <span className="status pending">Pending</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src="img/people.png" alt="John Doe" />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <span className="status process">Process</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* TODOS */}
            <div className="todo">
              <div className="head">
                <h3>To-Dos</h3>
                <i className="bx bx-plus-circle"></i>
                <i className="bx bx-filter"></i>
              </div>
              <ul className="todo-list">
                <li className="completed">
                  <p>Finish Dashboard Design</p>
                  <i className="bx bx-check-circle"></i>
                </li>
                <li className="completed">
                  <p>Fix Search Functionality</p>
                  <i className="bx bx-check-circle"></i>
                </li>
                <li className="completed">
                  <p>Implement API for Analytics</p>
                  <i className="bx bx-check-circle"></i>
                </li>
                <li className="completed">
                  <p>Review New User Feedback</p>
                  <i className="bx bx-check-circle"></i>
                </li>
              </ul>
            </div>
          </div>
        </main>
        {/* MAIN */}
      </section>
      {/* CONTENT */}
    </section>
  );
};

export default Dashboard;
