import React from "react";
import "../App.css";

const MainContent = () => {
  return (
    <div className="main-content">
      <section className="section overview">
        <h2>Overview</h2>
        <p>Welcome to your dashboard! Here you can manage books, view statistics, and more.</p>
      </section>

      <section className="section stats">
        <h2>Statistics</h2>
        <div className="stats-cards">
          <div className="card">
            <h3>Total Books</h3>
            <p>1,200</p>
          </div>
          <div className="card">
            <h3>Categories</h3>
            <p>25</p>
          </div>
          <div className="card">
            <h3>New Additions</h3>
            <p>15</p>
          </div>
        </div>
      </section>

      <section className="section recent-books">
        <h2>Recent Books</h2>
        <ul className="book-list">
          <li>Book Title 1</li>
          <li>Book Title 2</li>
          <li>Book Title 3</li>
          <li>Book Title 4</li>
        </ul>
      </section>
    </div>
  );
};

export default MainContent;
