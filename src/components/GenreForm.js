import React, { useState, useEffect } from 'react';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const GenreForm = ({ isEditMode, currentGenre, onSubmit, onCancel }) => {
  const [genreData, setGenreData] = useState({ genreName: '', description: '' });

  useEffect(() => {
    if (isEditMode) {
      setGenreData({
        genreName: currentGenre?.genreName || '',
        description: currentGenre?.description || ''
      });
    }
  }, [isEditMode, currentGenre]);

  const handleChange = (e, field) => {
    setGenreData({ ...genreData, [field]: e.target.value });
  };

  const handleSubmit = () => {
    if (!genreData.genreName || !genreData.description) {
      return toast.error('Please fill all fields.');
    }
    onSubmit(genreData);
  };

  return (
    <div className="overlay">
      <div className="add-genre-form">
        <input
          type="text"
          placeholder="Genre Name"
          value={genreData.genreName}
          onChange={(e) => handleChange(e, 'genreName')}
        />
        <textarea
          placeholder="Description"
          value={genreData.description}
          onChange={(e) => handleChange(e, 'description')}
        />
        <div className="button-container">
          <button onClick={handleSubmit} className="btn btn-success">
            {isEditMode ? 'Save Changes' : 'Add'}
          </button>
          <button onClick={onCancel} className="btn btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default GenreForm;
