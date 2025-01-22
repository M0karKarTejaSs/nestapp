import React, { useState, useEffect } from 'react';
import '../styles/Dash.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { retToken } from '../AuthToken';
import { jwtDecode } from 'jwt-decode';
import Sidebar from '../components/Sidebar';
import DataTable from '../components/DataTable';

const Genre = ({ toggleSidebar, isSidebarHidden, toggleDarkMode, isSearchFormShown, handleSearchButtonClick }) => {
  const [genres, setGenres] = useState([]);
  const [isAddGenre, setIsAddGenre] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentGenre, setCurrentGenre] = useState({ genreId: '', genreName: '', description: '' });
  const [newGenre, setNewGenre] = useState({ genreName: '', description: '' });
  const [userId, setUserId] = useState(null);

  const columns = [
    { header: 'ID', accessor: 'genreId' },
    { header: 'Genre Name', accessor: 'genreName' },
    { header: 'Description', accessor: 'description' },
  ];

  useEffect(() => {
    const token = retToken();
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded?.userId || null);
      fetchGenres(decoded?.userId);
    }
  }, []);

  const fetchGenres = async (userId) => {
    try {
      const response = await fetch('http://localhost:8080/api/genre', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: retToken(),
        },
        body: JSON.stringify({ action: 'READ_ALL', userId }),
      });
      if (!response.ok) throw new Error('Failed to fetch genres');
      const data = await response.json();
      setGenres(data);
    } catch {
      toast.error('Error fetching genres');
    }
  };

  const handleEdit = (genre) => {
    setIsEditMode(true);
    setIsAddGenre(true);
    setCurrentGenre(genre);
  };

  const handleDelete = async (genre) => {
    try {
      const response = await fetch('http://localhost:8080/api/genre', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: retToken(),
        },
        body: JSON.stringify({ action: 'DELETE', genreId: genre.genreId, userId }),
      });
      if (!response.ok) throw new Error('Failed to delete genre');
      setGenres((prev) => prev.filter((g) => g.genreId !== genre.genreId));
      toast.success('Genre deleted successfully!');
    } catch {
      toast.error('Failed to delete genre');
    }
  };

  const handleSubmit = async () => {
    const genre = isEditMode ? currentGenre : { ...newGenre, userId };
    if (!genre.genreName || !genre.description) return toast.error('Please fill all fields.');

    try {
      const response = await fetch('http://localhost:8080/api/genre', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: retToken(),
        },
        body: JSON.stringify(isEditMode ? { action: 'UPDATE', ...genre } : { action: 'CREATE', ...genre }),
      });
      if (!response.ok) throw new Error('Failed to save genre');
      const data = await response.json();
      setGenres((prev) =>
        isEditMode ? prev.map((g) => (g.genreId === genre.genreId ? data : g)) : [...prev, data]
      );
      resetForm();
      toast.success(isEditMode ? 'Genre updated successfully!' : 'Genre added successfully!');
    } catch {
      toast.error(isEditMode ? 'Failed to update genre.' : 'Failed to add genre.');
    }
  };

  const handleGenreChange = (e, field) => {
    const value = e.target.value;
    const genreState = isEditMode ? currentGenre : newGenre;
    isEditMode ? setCurrentGenre({ ...genreState, [field]: value }) : setNewGenre({ ...genreState, [field]: value });
  };


  const resetForm = () => {
    setIsAddGenre(false);
    setIsEditMode(false);
    setCurrentGenre({ genreId: '', genreName: '', description: '' });
    setNewGenre({ genreName: '', description: '' });
  };

  return (
    <section id="dashboard">
      <Sidebar isSidebarHidden={isSidebarHidden} />
      <section id="content">
        <nav>
          <i className="bx bx-menu" onClick={toggleSidebar}></i>
          <a href="#" className="nav-link">Genres</a>
          <form className={isSearchFormShown ? 'show' : ''}>
            <div className="form-input">
              <input type="search" placeholder="Search..." />
              <button type="button" onClick={handleSearchButtonClick}>
                <i className={`bx ${isSearchFormShown ? 'bx-x' : 'bx-search'}`}></i>
              </button>
            </div>
          </form>
          <label htmlFor="switch-mode" className="switch-mode" onClick={toggleDarkMode}></label>
        </nav>

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

          {!isAddGenre ? (
            <DataTable
              title="Genre List"
              columns={columns}
              data={genres}
              onEdit={handleEdit}
              onDelete={handleDelete}
              handleGenreChange={handleGenreChange} // Pass it as a prop
            />

          ) : (
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
                    {isEditMode ? 'Save Changes' : 'Add'}
                  </button>
                  <button onClick={resetForm} className="btn btn-secondary">Cancel</button>
                </div>
              </div>
            </div>
          )}
          <ToastContainer />
        </main>
      </section>
    </section>
  );
};

export default Genre;
