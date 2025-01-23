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

    const columnHeaders = [
        'Title', 'ISBN', 'Author', 'Publisher', 'Publication Date',
        'Genre', 'Price', 'Quantity', 'Description',
    ];
    
    const customAccessorMapping = {
        'Publication Date': 'publication_date',
    };

    const columns = [
        { header: 'Index', accessor: 'index' },
        ...columnHeaders.map((header) => ({
            header,
            accessor: customAccessorMapping[header] || header.replace(/ /g, '_').toLowerCase(),
        })),
    ];
    
    useEffect(() => {
        const token = retToken();
        if (token) {
            const decoded = jwtDecode(token);
            setUserId(decoded?.userId || null);
            fetchBooks(decoded?.userId);
        }
    }, []);

    const fetchBooks = async (userId) => {
        try {
            const response = await fetch('http://localhost:8080/api/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: retToken(),
                },
                body: JSON.stringify({ action: 'READ_ALL', userId }),
            });
            if (!response.ok) throw new Error('Failed to fetch books');
            setBooks(await response.json());
        } catch {
            toast.error('Error fetching books');
        }
    };

    const handleSave = async (bookData) => {
        const isEditMode = !!currentBook;
        const book = { ...currentBook, ...bookData, userId };
        const action = isEditMode ? 'UPDATE' : 'CREATE';

        try {
            const response = await fetch('http://localhost:8080/api/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: retToken(),
                },
                body: JSON.stringify({ action, ...book }),
            });
            if (!response.ok) throw new Error('Failed to save book');
            const data = await response.json();

            setBooks((prev) =>
                isEditMode ? prev.map((b) => (b.bookId === data.bookId ? data : b)) : [...prev, data]
            );
            resetForm();
            toast.success(`Book ${isEditMode ? 'updated' : 'added'} successfully!`);
        } catch {
            toast.error(`Failed to ${isEditMode ? 'update' : 'add'} book`);
        }
    };

    const handleDelete = async (bookId) => {
        try {
            const response = await fetch('http://localhost:8080/api/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: retToken(),
                },
                body: JSON.stringify({ action: 'DELETE', bookId, userId }),
            });
            if (!response.ok) throw new Error('Failed to delete book');
            setBooks((prev) => prev.filter((b) => b.bookId !== bookId));
            toast.success('Book deleted successfully!');
        } catch {
            toast.error('Failed to delete book');
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
                        <button onClick={() => setIsAddBook(true)} className="btn btn-success">Add Book</button>
                    </div>

                    {!isAddBook ? (
                        <DataTable
                            title="Books List"
                            columns={columns}
                            data={books.map((book, index) => ({
                                index: index + 1, // Add index to the data
                                title: book.title,
                                isbn: book.isbn,
                                author: book.authorName,
                                publisher: book.publisher,
                                publication_date: book.publicationDate,
                                genre: book.genre,
                                price: book.price,
                                quantity: book.quantity,
                                description: book.description,
                            }))}
                            onEdit={(book) => {
                                setCurrentBook(book);
                                setIsAddBook(true);
                            }}
                            onDelete={(book) => handleDelete(book.bookId)}
                        />
                    ) : (
                        <GenericForm
                            isEditMode={!!currentBook}
                            currentData={currentBook}
                            fields={columnHeaders.map((header) => ({
                                name: customAccessorMapping[header] || header.replace(/ /g, '_').toLowerCase(),
                                label: header,
                                placeholder: `Enter ${header}`,
                            }))}
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
