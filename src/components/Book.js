import React, { useState, useEffect } from "react";
import "../App.css";

const Books = () => {
  const [books, setBooks] = useState([
    {
      title: "Harry Potter and the Sorcerer's Stone123",
      author: "J.K. Rowling",
      year: 1997,
      description: "A young boy discovers he is a wizard and attends Hogwarts School of Witchcraft and Wizardry.",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Harry Potter and the Chamber of Secrets",
      author: "J.K. Rowling",
      year: 1998,
      description: "Harry returns to Hogwarts and uncovers the mystery of the Chamber of Secrets.",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Harry Potter and the Prisoner of Azkaban",
      author: "J.K. Rowling",
      year: 1999,
      description: "Harry learns about Sirius Black and his connection to his parents.",
      image: "https://via.placeholder.com/150",
    },
  ]);

  return (
    <div className="book-page">
      <h1 className="page-title">Books</h1>
      <div className="book-list">
        {books.map((book, index) => (
          <div className="book-card" key={index}>
            <img src={book.image} alt={`${book.title} cover`} className="book-image" />
            <div className="book-details">
              <h2 className="book-title">{book.title}</h2>
              <p className="book-author">Author: {book.author}</p>
              <p className="book-year">Year: {book.year}</p>
              <p className="book-description">{book.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
