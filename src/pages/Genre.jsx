import React, { useState, useEffect } from 'react';
import '../styles/Dash.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { retToken } from '../AuthToken';
import { jwtDecode } from 'jwt-decode';
import Sidebar from '../components/Sidebar';
import DataTable from '../components/DataTable.js';
import Navbar from '../components/Navbar';
import GenreForm from '../components/GenreForm'; // Import GenreForm

const Genre = ({ toggleSidebar, isSidebarHidden, toggleDarkMode, isSearchFormShown, handleSearchButtonClick }) => {
  const [genres, setGenres] = useState([]);
  const [isAddGenre, setIsAddGenre] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentGenre, setCurrentGenre] = useState({ genreId: '', genreName: '', description: '' });
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

  const handleDelete = async (genreId, userId) => {
    try {
      const response = await fetch('http://localhost:8080/api/genre', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: retToken(),
        },
        body: JSON.stringify({ action: 'DELETE', genreId, userId }), // Include genreId and userId in the payload
      });

      if (!response.ok) throw new Error('Failed to delete genre');
      setGenres((prev) => prev.filter((g) => g.genreId !== genreId)); // Update genre list
      toast.success('Genre deleted successfully!');
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };


  const handleSubmit = async (genreData) => {
    const genre = isEditMode ? { ...currentGenre, ...genreData } : { ...genreData, userId };
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

  const resetForm = () => {
    setIsAddGenre(false);
    setIsEditMode(false);
    setCurrentGenre({ genreId: '', genreName: '', description: '' });
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
              <h1>Genre</h1>
              <ul className="breadcrumb">
                <li><a href="#">Genre</a></li>
                <li><i className="bx bx-chevron-right"></i></li>
                
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
              onDelete={handleDelete} // Make sure to pass the correct onDelete function
              userId={userId} // Pass userId to the DataTable
            />

          ) : (
            <GenreForm
              isEditMode={isEditMode}
              currentGenre={currentGenre}
              onSubmit={handleSubmit}
              onCancel={resetForm}
            />
          )}
          <ToastContainer />
        </main>
      </section>
    </section>
  );
};

export default Genre;
