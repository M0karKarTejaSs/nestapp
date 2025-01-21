import React, { useState, useEffect } from "react";
import "../App.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { retToken } from "../AuthToken"

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [isAddGenre, setIsAddGenre] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentGenre, setCurrentGenre] = useState({ genreId: "", genreName: "", description: "" });
  const [newGenre, setNewGenre] = useState({ genreName: "", description: "" });

  useEffect(() => {
    // const fetchGenres = async () => {
    //   try {
    //     console.log(retToken(), "retToken()");

    //     const response = await fetch("http://localhost:8080/api/genre", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": retToken(),
    //       },
    //     });
    //     if (!response.ok) throw new Error("Error fetching genres.");
    //     const data = await response.json();
    //     setGenres(data);
    //   } catch {
    //     toast.error("Error fetching genres.");
    //   }
    // };
    
    const fetchGenres = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/genre", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": retToken(),
          },
          body: JSON.stringify({ action: "READ_ALL" }),
        });
        if (!response.ok) throw new Error("Error fetching genres.");
        const data = await response.json();
        setGenres(data);
      } catch {
        toast.error("Error fetching genres.");
      }
    };
    
    
    fetchGenres();
  }, []);

  const handleGenreChange = (e, field) => {
    const value = e.target.value;
    isEditMode ? setCurrentGenre({ ...currentGenre, [field]: value }) : setNewGenre({ ...newGenre, [field]: value });
  };

  // const deleteGenre = async (genreId) => {
  //   try {
  //     const response = await fetch(`http://localhost:8080/api/genre/${genreId}`, {
  //       method: "DELETE", headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": retToken(),
  //       },
  //     });
  //     if (!response.ok) throw new Error("Failed to delete genre.");
  //     setGenres(prev => prev.filter(genre => genre.genreId !== genreId));
  //     toast.success("Deleted successfully!");
  //   } catch {
  //     toast.error("Failed to delete genre.");
  //   }
  // };

  const deleteGenre = async (genreId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/genre`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": retToken(),
        },
        body: JSON.stringify({ action: "DELETE", genreId }),
      });
      if (!response.ok) throw new Error("Failed to delete genre.");
      setGenres((prev) => prev.filter((genre) => genre.genreId !== genreId));
      toast.success("Deleted successfully!");
    } catch {
      toast.error("Failed to delete genre.");
    }
  };


  // const handleSubmit = async () => {
  //   const genre = isEditMode ? currentGenre : newGenre;
  //   if (!genre.genreName || !genre.description) return toast.error("Please fill all fields.");

  //   try {
  //     console.log(currentGenre, "currentGenre");

  //     // Create headers for the request
  //     let headers = new Headers();
  //     headers.append('Content-Type', 'application/json');
  //     headers.append('Authorization', retToken()); // Add the Bearer token from localStorage
  //     headers.append("Accept", "*/*");
  //     console.log(headers, "headers---");

  //     // Send request based on edit mode
  //     const response = isEditMode
  //       ? await fetch(`http://localhost:8080/api/genre/${currentGenre.genreId}`, {
  //         method: "PUT",
  //         headers: headers,
  //         credentials: 'include',  // Include credentials (cookies)
  //         body: JSON.stringify(currentGenre)
  //       })
  //       : await fetch("http://localhost:8080/api/genre", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Authorization": retToken(),
  //         },
  //         body: JSON.stringify(newGenre)
  //       });

  //     if (!response.ok) throw new Error(isEditMode ? "Failed to update genre." : "Failed to add genre.");

  //     const data = await response.json();
  //     setGenres(prev => isEditMode ? prev.map(genre => genre.genreId === currentGenre.genreId ? data : genre) : [...prev, data]);
  //     setIsAddGenre(false);
  //     setIsEditMode(false);
  //     setCurrentGenre({ genreId: "", genreName: "", description: "" });
  //     setNewGenre({ genreName: "", description: "" });
  //     toast.success(isEditMode ? "Genre updated successfully!" : "Genre added successfully!");
  //   } catch {
  //     toast.error(isEditMode ? "Failed to update genre." : "Failed to add genre.");
  //   }
  // };

  const handleSubmit = async () => {
    const genre = isEditMode ? currentGenre : newGenre;
    if (!genre.genreName || !genre.description) return toast.error("Please fill all fields.");

    try {
      const response = await fetch("http://localhost:8080/api/genre", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": retToken(),
        },
        body: JSON.stringify(
          isEditMode
            ? { action: "UPDATE", ...currentGenre }
            : { action: "CREATE", ...newGenre }
        ),
      });

      if (!response.ok) throw new Error(isEditMode ? "Failed to update genre." : "Failed to add genre.");

      const data = await response.json();
      setGenres((prev) =>
        isEditMode
          ? prev.map((genre) => (genre.genreId === currentGenre.genreId ? data : genre))
          : [...prev, data]
      );
      setIsAddGenre(false);
      setIsEditMode(false);
      setCurrentGenre({ genreId: "", genreName: "", description: "" });
      setNewGenre({ genreName: "", description: "" });
      toast.success(isEditMode ? "Genre updated successfully!" : "Genre added successfully!");
    } catch {
      toast.error(isEditMode ? "Failed to update genre." : "Failed to add genre.");
    }
  };


  const toggleForm = () => {
    setIsAddGenre(true);
    setIsEditMode(false);
    setCurrentGenre({ genreId: "", genreName: "", description: "" });
  };

  const handleBack = () => {
    setIsAddGenre(false);
    setIsEditMode(false);
    setCurrentGenre({ genreId: "", genreName: "", description: "" });
    setNewGenre({ genreName: "", description: "" });
  };

  return (
    <div className="genre-page">
      <h1 className="page-title">{isAddGenre ? (isEditMode ? "Edit Genre" : "Add Genre") : "Genres"}</h1>
      {!isAddGenre ? (
        <>
          <button onClick={toggleForm} className="addGenre btn add-btn">Add Genre</button>
          <table className="genre-table">
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
                    <i onClick={() => { setIsEditMode(true); setIsAddGenre(true); setCurrentGenre(genre); }} className="bi bi-pencil-square edit-icon"></i>
                    <i onClick={() => deleteGenre(genre.genreId)} className="bi bi-trash delete-icon"></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="add-genre-form">
          <input
            type="text"
            placeholder="Genre Name"
            value={isEditMode ? currentGenre.genreName : newGenre.genreName}
            onChange={(e) => handleGenreChange(e, "genreName")}
          />
          <textarea
            placeholder="Description"
            value={isEditMode ? currentGenre.description : newGenre.description}
            onChange={(e) => handleGenreChange(e, "description")}
          />
          <div className="button-container">
            <button onClick={handleSubmit} className="btn btn-success">
              <i className="bi bi-check-circle"></i> {isEditMode ? "Save Changes" : "Add"}
            </button>
            <button onClick={() => setIsAddGenre(false)} className="btn btn-secondary">
              <i className="bi bi-x-circle"></i> Cancel
            </button>
            <button onClick={handleBack} className="btn btn-secondary back-btn">
              <i className="bi bi-arrow-left"></i> Back
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Genres;
