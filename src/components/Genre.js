import React, { useState, useEffect } from "react";
import "../App.css";
import axios from 'axios';

const Genres = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchGenres() {
    try {
        const response = await axios.get("http://localhost:8080/api/genre");
        setGenres(response.data);
        console.log(response,"response", response.data);
      } catch (error) {
        console.error('Login error:', error);
      }
    }
    fetchGenres();
  }, []);

  return (
    <div className="genre-page">
      <h1 className="page-title">Genres</h1>
      <table className="genre-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Genre Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {genres.map((genre) => (
            <tr key={genre.genreId}>
              <td>{genre.genreId}</td>
              <td>{genre.genreName}</td>
              <td>{genre.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Genres;
