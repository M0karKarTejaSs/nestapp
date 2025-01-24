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

const Book = ({ toggleSidebar, isSidebarHidden, toggleDarkMode, isSearchFormShown, handleSearchButtonClick }) => {
    const [books, setBooks] = useState([]);
    const [isAddBook, setIsAddBook] = useState(false);
    const [currentBook, setCurrentBook] = useState(null);
    const [userId, setUserId] = useState(null);
    const [authorsMap, setAuthorsMap] = useState(new Map());
    const [genresMap, setGenresMap] = useState(new Map());

    const columns = [
        { header: 'Index', accessor: 'index' },
        { header: 'Title', accessor: 'title' },
        { header: 'ISBN', accessor: 'isbn' },
        { header: 'Author', accessor: 'author' },
        { header: 'Genre', accessor: 'genre' },
        { header: 'Price', accessor: 'price' },
        { header: 'Quantity', accessor: 'quantity' },
    ];

    useEffect(() => {
        const token = retToken();
        if (token) {
            const { userId } = jwtDecode(token);
            setUserId(userId);
            fetchBooks(userId);
        }
    }, []);

    const fetchBooks = async (userId) => {
        try {
            const response = await fetch('http://localhost:8080/api/book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: retToken() },
                body: JSON.stringify({ action: 'READ_ALL', userId }),
            });

            if (!response.ok) throw new Error('Failed to fetch books');

            const booksData = await response.json();

            const authors = new Map();
            const genres = new Map();

            const mappedBooks = booksData.map((book) => {
                if (book.author?.authorName && book.author?.authorId) {
                    authors.set(book.author.authorName, book.author.authorId);
                }
                if (book.genre?.genreName && book.genre?.genreId) {
                    genres.set(book.genre.genreName, book.genre.genreId);
                }

                return {
                    ...book,
                    authorName: book.author?.authorName || '',
                    genreName: book.genre?.genreName || '',
                };
            });

            setBooks(mappedBooks);
            setAuthorsMap(authors);
            setGenresMap(genres);
        } catch (error) {
            toast.error('Error fetching books');
        }
    };

    const handleSave = async (bookData) => {
        const isEditMode = !!currentBook;
        const action = isEditMode ? 'UPDATE' : 'CREATE';

        // Correctly fetch authorId and genreId using dropdown values
        const authorId = bookData.authorId; // bookData.authorId is already the ID selected from dropdown
        const genreId = bookData.genreId; // bookData.genreId is already the ID selected from dropdown

        if (!authorId || !genreId) {
            toast.error('Please select valid Author and Genre.');
            return;
        }

        const payload = {
            action,
            title: bookData.title.trim(),
            isbn: bookData.isbn.trim(),
            authorId: parseInt(authorId, 10),
            genreId: parseInt(genreId, 10),
            publisher: bookData.publisher.trim(),
            publicationDate: new Date(bookData.publication_date).toISOString().split('T')[0],
            price: parseFloat(bookData.price).toFixed(2),
            rating: parseFloat(parseFloat(bookData.rating).toFixed(2)),
            quantity: parseInt(bookData.quantity, 10),
            description: bookData.description.trim(),
            userId: parseInt(userId, 10),
        };

        try {
            const response = await fetch('http://localhost:8080/api/book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: retToken() },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error('Failed to save book');

            const savedBook = await response.json();
            setBooks((prevBooks) =>
                isEditMode
                    ? prevBooks.map((b) => (b.bookId === savedBook.bookId ? savedBook : b))
                    : [...prevBooks, savedBook]
            );

            resetForm();
            toast.success(`Book ${isEditMode ? 'updated' : 'added'} successfully!`);
        } catch (error) {
            toast.error(`Failed to ${isEditMode ? 'update' : 'add'} book`);
        }
    };


    const handleDelete = async (bookId) => {
        try {
            const response = await fetch('http://localhost:8080/api/book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: retToken() },
                body: JSON.stringify({ action: 'DELETE', bookId, userId }),
            });

            if (!response.ok) throw new Error('Failed to delete book');

            setBooks((prevBooks) => prevBooks.filter((book) => book.bookId !== bookId));
            toast.success('Book deleted successfully!');
        } catch {
            toast.error('Failed to delete book');
        }
    };

    const resetForm = () => {
        setIsAddBook(false);
        setCurrentBook(null);
    };

    const getDropdownOptions = (map) =>
        Array.from(map.entries()).map(([name, id]) => ({ value: id, label: name }));

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
                        <button onClick={() => setIsAddBook(true)} className="btn btn-success">Add Book</button>
                    </div>

                    {!isAddBook ? (
                        <DataTable
                            title="Books List"
                            columns={columns}
                            data={books.map((book, index) => ({
                                index: index + 1,
                                title: book.title,
                                isbn: book.isbn,
                                author: book.authorName,
                                publisher: book.publisher,
                                publication_date: book.publicationDate,
                                genre: book.genreName,
                                price: book.price,
                                quantity: book.quantity,
                                description: book.description,
                            }))}
                            onEdit={(book) => { setCurrentBook(book); setIsAddBook(true); }}
                            onDelete={(book) => handleDelete(book.bookId)}
                        />
                    ) : (
                        <GenericForm
                            isEditMode={!!currentBook}
                            currentData={currentBook}
                            fields={[
                                { name: 'title', label: 'Title', placeholder: 'Enter Title' },
                                { name: 'isbn', label: 'ISBN', placeholder: 'Enter ISBN' },
                                {
                                    name: 'authorId',
                                    label: 'Author',
                                    type: 'dropdown',
                                    options: getDropdownOptions(authorsMap),
                                    defaultValue: currentBook?.authorId || '',
                                },
                                {
                                    name: 'genreId',
                                    label: 'Genre',
                                    type: 'dropdown',
                                    options: getDropdownOptions(genresMap),
                                    defaultValue: currentBook?.genreId || '',
                                },
                                { name: 'publisher', label: 'Publisher', placeholder: 'Enter Publisher' },
                                { name: 'publication_date', label: 'Publication Date', type: 'date' },
                                { name: 'price', label: 'Price', placeholder: 'Enter Price', type: 'number' },
                                { name: 'quantity', label: 'Quantity', placeholder: 'Enter Quantity', type: 'number' },
                                { name: 'description', label: 'Description', placeholder: 'Enter Description' },
                                { name: 'rating', label: 'rating', placeholder: 'Enter Rating' }
                            ]}
                            onSubmit={handleSave}
                            onCancel={resetForm}
                            formTitle={currentBook ? 'Edit Book' : 'Add Book'}
                        />
                    )}
                    <ToastContainer />
                </main>
            </section>
        </section>
    );
};

export default Book;
