import React, { useEffect, useState } from 'react';
import '../styles/Dash.css';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { retToken } from '../AuthToken';
import { toast, ToastContainer } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = ({ toggleSidebar, isSidebarHidden, isDarkMode, toggleDarkMode, isSearchFormShown, handleSearchButtonClick }) => {
  const [counts, setCounts] = useState({
    books: 0,
    authors: 0,
    genres: 0,
  });

  const [activeIndex, setActiveIndex] = useState(0);

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

  const chartData = {
    labels: ['Books', 'Authors', 'Genres'],
    datasets: [
      {
        data: [counts.books, counts.authors, counts.genres],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderWidth: 1,
      },
    ],
  };

  const images = [
    "/books/jrr.jpg",
    "/books/narnia.jpg",
    "/books/stephen.jpg"
  ];

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section id="dashboard">
      <Sidebar isSidebarHidden={isSidebarHidden} />
      <section id="content">
        <Navbar
          toggleSidebar={toggleSidebar}
          isSearchFormShown={isSearchFormShown}
          handleSearchButtonClick={handleSearchButtonClick}
          toggleDarkMode={toggleDarkMode}
        />
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

          <div className="statistics-carousel-container">
            <div className="chart-section">
              <h3>Statistics Overview</h3>
              <Doughnut data={chartData} />
            </div>
            <div className="carousel-section">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="carousel-images">
                    {images.map((image, index) => (
                      <img key={index} className="carousel-image" src={image} alt={`Slide ${index + 1}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </main>
      </section>
    </section>
  );
};

export default Dashboard;
