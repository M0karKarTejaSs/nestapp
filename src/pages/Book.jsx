import React, { useState, useEffect } from 'react';
import '../styles/Dash.css';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { retToken } from '../AuthToken';
import { jwtDecode } from 'jwt-decode';

const Book = ({
    toggleSidebar,
    isSidebarHidden,
}) => {
    const [books, setBooks] = useState([]);
    const [isAddBook, setIsAddBook] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentBook, setCurrentBook] = useState({ bookId: '', title: '', price: '', rating: '', quantity: '' });
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = retToken();
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.userId);
            fetchBooks(decodedToken.userId);
        }
    }, []);

    const fetchBooks = async (userId) => {
        try {
            const response = await fetch('http://localhost:8080/api/book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: retToken() },
                body: JSON.stringify({ action: 'READ_ALL', userId }),
            });
            if (!response.ok) throw new Error('Error fetching books.');
            setBooks(await response.json());
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleInputChange = (e, field) => setCurrentBook(prev => ({ ...prev, [field]: e.target.value }));

    const handleSubmit = async () => {
        const { bookId, title, price, rating, quantity } = currentBook;
        if (!title || !price || !rating || quantity === undefined) return toast.error('All fields are required.');

        const action = isEditMode ? 'UPDATE' : 'CREATE';
        try {
            const response = await fetch('http://localhost:8080/api/book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: retToken() },
                body: JSON.stringify({
                    action,
                    title,
                    price,
                    rating: parseFloat(rating),
                    quantity, // Include the quantity field
                    userId,
                    authorId: 6,  // Hardcoded authorId
                    genreId: 1,   // Hardcoded genreId
                }),
            });

            if (!response.ok) throw new Error(isEditMode ? 'Failed to update book.' : 'Failed to add book.');
            const updatedBook = await response.json();
            setBooks(prev => isEditMode
                ? prev.map(book => (book.bookId === bookId ? updatedBook : book))
                : [...prev, updatedBook]);

            toast.success(isEditMode ? 'Book updated successfully!' : 'Book added successfully!');
            resetForm();
        } catch (error) {
            toast.error(error.message);
        }
    };

    const deleteBook = async (bookId) => {
        try {
            const response = await fetch('http://localhost:8080/api/book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: retToken() },
                body: JSON.stringify({ action: 'DELETE', bookId, userId }),
            });

            if (!response.ok) throw new Error('Failed to delete book.');
            setBooks(prev => prev.filter(book => book.bookId !== bookId));
            toast.success('Book deleted successfully!');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const resetForm = () => {
        setIsAddBook(false);
        setIsEditMode(false);
        setCurrentBook({ bookId: '', title: '', price: '', rating: '', quantity: '' });
    };

    return (
        <section id="dashboard">
            <section id="sidebar" className={isSidebarHidden ? 'hide' : ''}>
                <Link to="/" className="brand">
                    <i className="bx bxs-smile"></i><span className="text">AdminHub</span>
                </Link>
                <ul className="side-menu top">
                    <li><Link to="/"><i className="bx bxs-dashboard"></i> Dashboard</Link></li>
                    <li className="active"><Link to="/book"><i className="bx bxs-book"></i> Books</Link></li>
                </ul>
            </section>

            <section id="content">
                <nav>
                    <i className="bx bx-menu" onClick={toggleSidebar}></i>
                    <a href="#" className="nav-link">Books</a>
                </nav>

                <main>
                    <div className="head-title">
                        <h1>Books</h1>
                        <button onClick={() => setIsAddBook(true)} className="btn btn-success">Add Book</button>
                    </div>

                    {isAddBook ? (
                        <div className="overlay">
                            <div className="add-genre-form">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={currentBook.title}
                                    onChange={(e) => handleInputChange(e, 'title')}
                                />
                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={currentBook.price}
                                    onChange={(e) => handleInputChange(e, 'price')}
                                />
                                <input
                                    type="number"
                                    placeholder="Rating"
                                    value={currentBook.rating}
                                    onChange={(e) => handleInputChange(e, 'rating')}
                                />
                                <input
                                    type="number"
                                    placeholder="Quantity"
                                    value={currentBook.quantity}
                                    onChange={(e) => handleInputChange(e, 'quantity')}
                                />
                                <div className="button-container">
                                    <button onClick={handleSubmit} className="btn btn-success">
                                        <i className="bi bi-check-circle"></i> {isEditMode ? 'Save Changes' : 'Add'}
                                    </button>
                                    <button onClick={resetForm} className="btn btn-secondary">
                                        <i className="bi bi-x-circle"></i> Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="table-data">
                            <div className="order">
                                <div className="head">
                                    <h3>Books List</h3>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Price</th>
                                            <th>Rating</th>
                                            <th>Quantity</th> {/* Add quantity column */}
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {books.map((book) => (
                                            <tr key={book.bookId}>
                                                <td>{book.title}</td>
                                                <td>{book.price}</td>
                                                <td>{book.rating}</td>
                                                <td>{book.quantity}</td> {/* Display quantity */}
                                                <td>
                                                    <i onClick={() => { setIsEditMode(true); setIsAddBook(true); setCurrentBook(book); }} className="bi bi-pencil-square edit-icon"></i>
                                                    <i onClick={() => deleteBook(book.bookId)} className="bi bi-trash delete-icon"></i>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </main>
            </section>

            <ToastContainer />
        </section>
    );
};

export default Book;
