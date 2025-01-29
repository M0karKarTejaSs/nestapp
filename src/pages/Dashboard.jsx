// Dashboard.js
import React, { useEffect, useState } from 'react';
import '../styles/Dash.css';
import useUserProfile from '../components/DashboardAuth';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { retToken } from '../AuthToken';
import { toast, ToastContainer } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';


const Dashboard = ({ toggleSidebar, isSidebarHidden, isDarkMode, toggleDarkMode, isSearchFormShown, handleSearchButtonClick }) => {
  const { userProfile, errorMessage } = useUserProfile();
  const [booksCount, setBooksCount] = useState([]);
  const [authorsCount, setAuthorsCount] = useState([]);
  const [genresCount, setGenresCount] = useState([]);

  const API_BOOK_URL = 'http://localhost:8080/api/book';

  useEffect(() => {
    const token = retToken();
    if (token) {
      const decoded = jwtDecode(token);
      fetchBooks(decoded.userId);
      fetchAuthors(decoded.userId);
      fetchGenres(decoded.userId);
    }
  }, []);

  const fetchBooks = async (userId) => {
    try {
      const response = await fetch(API_BOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: retToken() },
        body: JSON.stringify({ action: 'READ_ALL', userId }),
      });
      if (!response.ok) { const err = await response.text(); toast.error(err); return; }
      const count = await response?.json();
      setBooksCount(count?.length);
      console.log(count, "await response?.json()");

    } catch (error) {
      toast.error('Error fetching books. Please try again later.');
    }
  };

  const fetchAuthors = async (userId) => {
    try {
      const response = await fetch('http://localhost:8080/api/author', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: retToken() },
        body: JSON.stringify({ action: 'READ_ALL', userId }),
      });
      if (!response.ok) { const err = await response.text(); toast.error(err); return; }
      const count = await response?.json();
      setAuthorsCount(count?.length);
      console.log(count, "await response?.json()");

    } catch (error) {
      toast.error('Error fetching books. Please try again later.');
    }
  };

  const fetchGenres = async (userId) => {
    try {
      const response = await fetch('http://localhost:8080/api/genre', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: retToken() },
        body: JSON.stringify({ action: 'READ_ALL', userId }),
      });
      if (!response.ok) { const err = await response.text(); toast.error(err); return; }
      const count = await response?.json();
      setGenresCount(count?.length);
      console.log(count, "await response?.json()");

    } catch (error) {
      toast.error('Error fetching books. Please try again later.');
    }
  };

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
            {/* <a href="#" className="btn-download"><i className="bx bxs-cloud-download"></i><span className="text">Download PDF</span></a> */}
          </div>
          <div className="profile-message">
            <h3>{userProfile?.message || errorMessage || 'Loading profile...'}</h3>
          </div>
          <ul className="box-info">
            {['Total Books', 'Authors', 'Genres'].map((text, index) => (
              <li key={index}>
                <i className={`bx bxs-${['calendar-check', 'group', 'grid'][index]}`}></i>
                {/* <i className={`bx bxs-${['calendar-check', 'group', 'dollar-circle'][index]}`}></i> */}
                <span className="text">
                  <h3>{[booksCount, authorsCount, genresCount][index]}</h3>
                  {/* <h3>{[booksCount, authorsCount, '$2543'][index]}</h3> */}
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
                      <td><img src="/assets/user.png" alt="User" /><p>John Doe</p></td>
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
          <ToastContainer />
        </main>
      </section>
    </section>
  );
};

export default Dashboard;
