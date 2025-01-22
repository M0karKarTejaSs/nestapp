import React, { useState, useEffect } from 'react';
import '../styles/Dash.css';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { retToken } from '../AuthToken';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode

const Genre = ({
  toggleSidebar,
  isSidebarHidden,
  isDarkMode,
  toggleDarkMode,
  isSearchFormShown,
  handleSearchButtonClick,
}) => {
  const [genres, setGenres] = useState([]);
  const [isAddGenre, setIsAddGenre] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentGenre, setCurrentGenre] = useState({ genreId: '', genreName: '', description: '' });
  const [newGenre, setNewGenre] = useState({ genreName: '', description: '' });
  const [userId, setUserId] = useState(null);

  // Decode the JWT token to get userId
  const getUserIdFromToken = () => {
    const token = retToken();
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.userId; // Assuming the token has a 'userId' field
    }
    return null;
  };

  // Fetch genres from API
  const fetchGenres = async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      toast.error('User not authenticated!');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:8080/api/genre', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': retToken(),
        },
        body: JSON.stringify({ action: 'READ_ALL', userId }), // Pass the userId in the request body
      });
      if (!response.ok) throw new Error('Error fetching genres.');
      const data = await response.json();
      setGenres(data);
    } catch {
      toast.error('Error fetching genres.');
    }
  };

  useEffect(() => {
    const userId = getUserIdFromToken();
    if (userId) {
      setUserId(userId);
      fetchGenres();
    }
  }, []);

  const handleGenreChange = (e, field) => {
    const value = e.target.value;
    isEditMode
      ? setCurrentGenre({ ...currentGenre, [field]: value })
      : setNewGenre({ ...newGenre, [field]: value });
  };

  const handleSubmit = async () => {
    const genre = isEditMode ? currentGenre : newGenre;
    if (!genre.genreName || !genre.description) return toast.error('Please fill all fields.');

    try {
      const response = await fetch('http://localhost:8080/api/genre', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': retToken(),
        },
        body: JSON.stringify(
          isEditMode
            ? { action: 'UPDATE', ...currentGenre }
            : { action: 'CREATE', ...newGenre, userId } // Pass userId when creating a genre
        ),
      });

      if (!response.ok) throw new Error(isEditMode ? 'Failed to update genre.' : 'Failed to add genre.');

      const data = await response.json();
      setGenres((prev) =>
        isEditMode
          ? prev.map((genre) => (genre.genreId === currentGenre.genreId ? data : genre))
          : [...prev, data]
      );
      setIsAddGenre(false);
      setIsEditMode(false);
      setCurrentGenre({ genreId: '', genreName: '', description: '' });
      setNewGenre({ genreName: '', description: '' });
      toast.success(isEditMode ? 'Genre updated successfully!' : 'Genre added successfully!');
    } catch {
      toast.error(isEditMode ? 'Failed to update genre.' : 'Failed to add genre.');
    }
  };

  const deleteGenre = async (genreId) => {
    try {
      const response = await fetch('http://localhost:8080/api/genre', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': retToken(),
        },
        body: JSON.stringify({ action: 'DELETE', genreId, userId }), // Pass userId when deleting a genre
      });
      if (!response.ok) throw new Error('Failed to delete genre.');
      setGenres((prev) => prev.filter((genre) => genre.genreId !== genreId));
      toast.success('Deleted successfully!');
    } catch {
      toast.error('Failed to delete genre.');
    }
  };

  return (
    <section id="dashboard">
      {/* SIDEBAR */}
      <section id="sidebar" className={isSidebarHidden ? 'hide' : ''}>
        <a href="#" className="brand">
          <i className="bx bxs-smile"></i>
          <span className="text">AdminHub</span>
        </a>
        <ul className="side-menu top">
          <li>
            <Link to="/">
              <i className="bx bxs-dashboard"></i>
              <span className="text">Dashboard</span>
            </Link>
          </li>
          <li className="active">
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
          <li>
            <Link to="#" className="logout">
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
          <a href="#" className="nav-link">Genres</a>
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
          <div className="head-title">
            <div className="left">
              <h1>Genre</h1>
              <ul className="breadcrumb">
                <li><a href="#">Genre</a></li>
                <li><i className="bx bx-chevron-right"></i></li>
                <li><a className="active" href="#">Home</a></li>
              </ul>
            </div>
            <button onClick={() => setIsAddGenre(true)} className="btn btn-success">Add Genre</button>
          </div>

          {/* DATA TABLES */}
          {!isAddGenre && (
            <div className="table-data">
              <div className="order">
                <div className="head">
                  <h3>Genre List</h3>
                  <i className="bx bx-search"></i>
                  <i className="bx bx-filter"></i>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Genre Name</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {genres.map((genre, index) => (
                      <tr key={genre.genreId}>
                        <td>{index + 1}</td>
                        <td>{genre.genreName}</td>
                        <td>{genre.description}</td>
                        <td>
                          <i
                            onClick={() => {
                              setIsEditMode(true);
                              setIsAddGenre(true);
                              setCurrentGenre(genre);
                            }}
                            className="bi bi-pencil-square edit-icon"
                          ></i>
                          <i onClick={() => deleteGenre(genre.genreId)} className="bi bi-trash delete-icon"></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Add/Edit Genre Form (Popup) */}
          {isAddGenre && (
            <div className="overlay">
              <div className="add-genre-form">
                <input
                  type="text"
                  placeholder="Genre Name"
                  value={isEditMode ? currentGenre.genreName : newGenre.genreName}
                  onChange={(e) => handleGenreChange(e, 'genreName')}
                />
                <textarea
                  placeholder="Description"
                  value={isEditMode ? currentGenre.description : newGenre.description}
                  onChange={(e) => handleGenreChange(e, 'description')}
                />
                <div className="button-container">
                  <button onClick={handleSubmit} className="btn btn-success">
                    <i className="bi bi-check-circle"></i> {isEditMode ? 'Save Changes' : 'Add'}
                  </button>
                  <button onClick={() => setIsAddGenre(false)} className="btn btn-secondary">
                    <i className="bi bi-x-circle"></i> Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          <ToastContainer />
        </main>
        {/* MAIN */}
      </section>
      {/* CONTENT */}
    </section>
  );
};

export default Genre;
