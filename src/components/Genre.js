import React, { useState, useEffect } from "react";
import "../styles/Dash.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { retToken } from "../AuthToken";

const Dashboard = () => {
  const [genres, setGenres] = useState([]);
  const [isSidebarHidden, setSidebarHidden] = useState(false);
  const [isAddGenre, setIsAddGenre] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentGenre, setCurrentGenre] = useState({ genreId: "", genreName: "", description: "" });
  const [newGenre, setNewGenre] = useState({ genreName: "", description: "" });

  const toggleSidebar = () => setSidebarHidden(!isSidebarHidden);

  useEffect(() => {
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
    isEditMode
      ? setCurrentGenre({ ...currentGenre, [field]: value })
      : setNewGenre({ ...newGenre, [field]: value });
  };

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

  const deleteGenre = async (genreId) => {
    try {
      const response = await fetch("http://localhost:8080/api/genre", {
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

  return (
    <section id="dashboard">
      <section id="sidebar" className={isSidebarHidden ? "hide" : ""}>
        <a href="#" className="brand">
          <i className="bx bxs-smile"></i>
          <span className="text">AdminHub</span>
        </a>
        <ul className="side-menu top">
          <li>
            <a href="#">
              <i className="bx bxs-dashboard"></i>
              <span className="text">Dashboard</span>
            </a>
          </li>
        </ul>
      </section>

      <section id="content">
        <nav>
          <i className="bx bx-menu" onClick={toggleSidebar}></i>
          <span>Genres</span>
        </nav>

        <main>
          {!isAddGenre ? (
            <>
              <button onClick={() => setIsAddGenre(true)} className="addGenre btn add-btn">Add Genre</button>
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
              </div>
            </div>
          )}
          <ToastContainer />
        </main>
      </section>
    </section>
  );
};

export default Dashboard;
