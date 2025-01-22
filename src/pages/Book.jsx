import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { retToken } from '../AuthToken';
import { jwtDecode } from 'jwt-decode';
import Sidebar from '../components/Sidebar'; // Import Sidebar
import DataTable from '../components/DataTable'; // Import DataTable

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

    const columns = [
        { header: 'Title', accessor: 'title' },
        { header: 'Price', accessor: 'price' },
        { header: 'Rating', accessor: 'rating' },
        { header: 'Quantity', accessor: 'quantity' },
    ];

    return (
        <section id="dashboard">
            {/* Dynamic Sidebar */}
            <Sidebar isSidebarHidden={isSidebarHidden} />

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
                        <DataTable
                            title="Books List"
                            columns={columns}
                            data={books}
                            onEdit={(book) => { setIsEditMode(true); setIsAddBook(true); setCurrentBook(book); }}
                            onDelete={deleteBook}
                        />
                    )}
                </main>
            </section>

            <ToastContainer />
        </section>
    );
};

export default Book;
