import React, { useEffect, useState } from 'react';
import '../styles/Dash.css';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { retToken } from '../AuthToken';
import { toast, ToastContainer } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const Dashboard = ({ toggleSidebar, isSidebarHidden, isDarkMode, toggleDarkMode, isSearchFormShown, handleSearchButtonClick }) => {
  const [counts, setCounts] = useState({
    books: 0,
    authors: 0,
    genres: 0,
  });

  const API_URLS = {
    books: 'http://localhost:8080/api/book',
    authors: 'http://localhost:8080/api/author',
    genres: 'http://localhost:8080/api/genre',
  };

  useEffect(() => {
    const token = retToken();
    if (token) {
      const decoded = jwtDecode(token);
      fetchData('books', decoded.userId);
      fetchData('authors', decoded.userId);
      fetchData('genres', decoded.userId);
    }
  }, []);

  const fetchData = async (type, userId) => {
    const API_URL = API_URLS[type];
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: retToken() },
        body: JSON.stringify({ action: 'READ_ALL', userId }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        toast.error(errorMessage);
        return;
      }

      const data = await response.json();
      setCounts((prevCounts) => ({
        ...prevCounts,
        [type]: data.length,
      }));
    } catch (error) {
      toast.error(`Error fetching ${type}. Please try again later.`);
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
          </div>

          <ul className="box-info">
            {['books', 'authors', 'genres'].map((type, index) => (
              <li key={index}>
                <i className={`bx bxs-${['calendar-check', 'group', 'grid'][index]}`}></i>
                <span className="text">
                  <h3>{counts[type]}</h3>
                  <p>{['Total Books', 'Authors', 'Genres'][index]}</p>
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
                <thead>
                  <tr><th>User</th><th>Date Order</th><th>Status</th></tr>
                </thead>
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
