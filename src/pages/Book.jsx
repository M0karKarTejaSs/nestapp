import React, { useState, useEffect } from 'react';
import '../styles/Dash.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { retToken } from '../AuthToken';
import { jwtDecode } from 'jwt-decode';
import Sidebar from '../components/Sidebar';
import DataTable from '../components/DataTable';
import Navbar from '../components/Navbar';
import GenericForm from '../components/GenericForm';
import Footer from "../components/Footer"

const API_BOOK_URL = 'http://localhost:8080/api/book';
const API_AUTHOR_URL = 'http://localhost:8080/api/author';
const API_GENRE_URL = 'http://localhost:8080/api/genre';

const Book = ({ toggleSidebar, isSidebarHidden, toggleDarkMode, isSearchFormShown, handleSearchButtonClick }) => {
    const [books, setBooks] = useState([]);
    const [isAddBook, setIsAddBook] = useState(false);
    const [currentBook, setCurrentBook] = useState(null);
    const [userId, setUserId] = useState(null);
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);

    const columns = [
        { header: 'Index', accessor: 'index' },
        { header: 'Title', accessor: 'title' },
        { header: 'ISBN', accessor: 'isbn' },
        { header: 'Author', accessor: 'authorName' },
        { header: 'Genre', accessor: 'genreName' },
        { header: 'Price', accessor: 'price' },
        { header: 'Quantity', accessor: 'quantity' },
    ];

    useEffect(() => {
        const token = retToken();
        if (token) {
            const decoded = jwtDecode(token);
            setUserId(decoded.userId);
            fetchBooks(decoded.userId);
            fetchAuthors(decoded.userId);
            fetchGenres(decoded.userId);
        }
    }, []);

    const fetchBooks = async (userId) => {
        try {
            const response = await fetch(API_BOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: retToken() },
                body: JSON.stringify({ action: 'READ_ALL', userId }),
            });
            if (!response.ok) { const err = await response.text(); toast.error(err); return; }

            const booksData = await response.json();
            setBooks(booksData);
        } catch (error) {
            toast.error('Error fetching books. Please try again later.');
        }
    };

    const fetchAuthors = async (userId) => {
        try {
            const response = await fetch(API_AUTHOR_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: retToken() },
                body: JSON.stringify({ action: 'READ_ALL', userId }),
            });
            if (response.ok) {
                const authorsData = await response.json();
                setAuthors(authorsData);
            } else {
                throw new Error();
            }
        } catch {
            toast.error('Error fetching authors. Please try again.');
        }
    };

    const fetchGenres = async (userId) => {
        try {
            const response = await fetch(API_GENRE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: retToken() },
                body: JSON.stringify({ action: 'READ_ALL', userId }),
            });
            if (response.ok) {
                const genresData = await response.json();
                setGenres(genresData);
            } else {
                throw new Error();
            }
        } catch {
            toast.error('Error fetching genres. Please try again.');
        }
    };

    const handleSave = async (bookData) => {
        const isEditMode = !!currentBook;
        const action = isEditMode ? 'UPDATE' : 'CREATE';

        const { title, isbn, publisher, publication_date, price, quantity, description, rating, authorId, genreId } = bookData;

        if (!authorId || !genreId) {
            toast.error('Please select valid Author and Genre.');
            return;
        }

        const payload = {
            action,
            title: title.trim(),
            isbn: isbn.trim(),
            authorId: parseInt(authorId, 10),
            genreId: parseInt(genreId, 10),
            publisher: publisher.trim(),
            publicationDate: new Date(publication_date).toISOString().split('T')[0],
            price: parseFloat(price).toFixed(2),
            rating: parseFloat(parseFloat(rating).toFixed(2)),
            quantity: parseInt(quantity, 10),
            description: description.trim(),
            userId: parseInt(userId, 10),
        };

        if (isEditMode && currentBook) {
            payload.bookId = currentBook.bookId;
        }

        try {
            const response = await fetch(API_BOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: retToken() },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error Response:', errorData);
                throw new Error('Failed to save book');
            }

            const savedBook = await response.json();
            console.log('Saved Book:', savedBook);

            setBooks((prevBooks) =>
                isEditMode
                    ? prevBooks.map((b) => (b.bookId === savedBook.bookId ? savedBook : b))
                    : [...prevBooks, savedBook]
            );

            resetForm();
            fetchBooks(payload.userId);
            toast.success(`Book ${isEditMode ? 'updated' : 'added'} successfully!`);
        } catch (error) {
            console.error('Save Error:', error);
            toast.error(`Failed to ${isEditMode ? 'update' : 'add'} book. Please try again.`);
        }
    };

    const handleDelete = async (bookId) => {
        try {
            const response = await fetch(API_BOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: retToken() },
                body: JSON.stringify({ action: 'DELETE', bookId, userId }),
            });

            if (!response.ok) throw new Error('Failed to delete book');

            setBooks((prevBooks) => prevBooks.filter((book) => book.bookId !== bookId));
            toast.success('Book deleted successfully!');
        } catch {
            toast.error('Failed to delete book. Please try again.');
        }
    };

    const resetForm = () => {
        setIsAddBook(false);
        setCurrentBook(null);
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
                            <h1>Books</h1>
                            <ul className="breadcrumb">
                                <li><a href="#">Books</a></li>
                                <li><i className="bx bx-chevron-right"></i></li>
                                <li><a className="active" href="#">Home</a></li>
                            </ul>
                        </div>
                        <button onClick={() => setIsAddBook(true)} className="btnadd btn-success">Add Book</button>
                    </div>

                    {!isAddBook ? (
                        <DataTable
                            title="Books List"
                            columns={columns}
                            data={books.map((book, index) => ({
                                index: index + 1,
                                title: book.title,
                                isbn: book.isbn,
                                authorName: book.author?.authorName || '',
                                genreName: book.genre?.genreName || '',
                                price: book.price,
                                quantity: book.quantity,
                                bookId: book.bookId,
                            }))}
                            onEdit={(book) => {
                                setCurrentBook(book);
                                setIsAddBook(true);
                            }}
                            onDelete={(book) => {
                                if (book) {
                                    handleDelete(book);
                                } else {
                                    toast.error('Error deleting book. Book ID is missing.');
                                    console.error('Error deleting book. Missing bookId:', book);
                                }
                            }}
                        />
                    ) : (
                        <GenericForm
                            isEditMode={!!currentBook}
                            currentData={currentBook}
                            fields={[
                                {
                                    name: 'title',
                                    label: 'Title',
                                    placeholder: 'Enter Title',
                                    type: 'text',
                                    validation: { required: true, message: 'Title is required' }
                                },
                                {
                                    name: 'isbn',
                                    label: 'ISBN',
                                    placeholder: 'Enter ISBN (13 digits)',
                                    type: 'number',
                                    validation: {
                                        required: true,
                                        pattern: /^\d{13}$/,
                                        message: 'ISBN must be exactly 13 digits'
                                    }
                                },
                                {
                                    name: 'authorId',
                                    label: 'Author',
                                    type: 'dropdown',
                                    options: authors.map((author) => ({ value: author.authorId, label: author.authorName })),
                                    defaultValue: currentBook?.authorId || '',
                                    validation: { required: true, message: 'Author selection is required' }
                                },
                                {
                                    name: 'genreId',
                                    label: 'Genre',
                                    type: 'dropdown',
                                    options: genres.map((genre) => ({ value: genre.genreId, label: genre.genreName })),
                                    defaultValue: currentBook?.genreId || '',
                                    validation: { required: true, message: 'Genre selection is required' }
                                },
                                {
                                    name: 'publisher',
                                    label: 'Publisher',
                                    placeholder: 'Enter Publisher',
                                    type: 'text',
                                    validation: { required: true, message: 'Publisher is required' }
                                },
                                {
                                    name: 'publication_date',
                                    label: 'Publication Date',
                                    type: 'date',
                                    validation: { required: true, message: 'Publication date is required' }
                                },
                                {
                                    name: 'price',
                                    label: 'Price',
                                    placeholder: 'Enter Price',
                                    type: 'number',
                                    validation: {
                                        required: true,
                                        min: 0,
                                        message: 'Price must be a positive number'
                                    }
                                },
                                {
                                    name: 'quantity',
                                    label: 'Quantity',
                                    placeholder: 'Enter Quantity',
                                    type: 'number',
                                    validation: {
                                        required: true,
                                        min: 0,
                                        message: 'Quantity must be a positive number'
                                    }
                                },
                                {
                                    name: 'description',
                                    label: 'Description',
                                    placeholder: 'Enter Description',
                                    type: 'text',
                                    validation: {
                                        required: false,
                                        maxLength: 500,
                                        message: 'Description must be less than 500 characters'
                                    }
                                },
                                {
                                    name: 'rating',
                                    label: 'Rating',
                                    placeholder: 'Enter Rating (0-5)',
                                    type: 'number',
                                    validation: {
                                        required: true,
                                        min: 0,
                                        max: 5,
                                        message: 'Rating must be between 0 and 5'
                                    }
                                }
                            ]}

                            onSubmit={handleSave}
                            onCancel={resetForm}
                            formTitle={currentBook ? 'Edit Book' : 'Add Book'}
                        />
                    )}
                    <ToastContainer />
                </main>
                <Footer />
            </section>
        </section>
    );
};

export default Book;
