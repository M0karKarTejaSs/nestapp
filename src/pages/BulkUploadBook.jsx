import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { retToken } from '../AuthToken';
import { jwtDecode } from 'jwt-decode';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import { parse } from 'csv-parse/browser/esm';  // Importing csv-parse

const API_BOOK_URL = 'http://localhost:8080/api/book';
const API_AUTHOR_URL = 'http://localhost:8080/api/author';
const API_GENRE_URL = 'http://localhost:8080/api/genre';

const BulkUploadBook = ({ toggleSidebar, isSidebarHidden, toggleDarkMode, isSearchFormShown, handleSearchButtonClick }) => {
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [userId, setUserId] = useState(null);

    // Columns for book details
    const columns = [
        'Title', 'ISBN', 'Author', 'Genre', 'Publisher', 'Publication Date', 'Price', 'Quantity', 'Description', 'Rating'
    ];

    useEffect(() => {
        const token = retToken();
        if (token) {
            const decoded = jwtDecode(token);
            setUserId(decoded.userId);
            fetchAuthors(decoded.userId);
            fetchGenres(decoded.userId);
        }
    }, []);

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

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const csvData = reader.result;
            parse(csvData, { columns: true, skip_empty_lines: true }, async (err, output) => {
                if (err) {
                    toast.error('Error parsing CSV file');
                    return;
                }

                // Prepare data for bulk upload
                const books = output.map((row) => ({
                    title: row.Title.trim(),
                    isbn: row.ISBN.trim(),
                    authorName: row.Author.trim(),
                    genreName: row.Genre.trim(),
                    publisher: row.Publisher.trim(),
                    publicationDate: new Date(row['Publication Date']).toISOString().split('T')[0],
                    price: parseFloat(row.Price).toFixed(2),
                    quantity: parseInt(row.Quantity, 10),
                    description: row.Description.trim(),
                    rating: parseFloat(row.Rating).toFixed(2),
                    userId: parseInt(userId, 10),
                }));

                // Call the backend to save the books
                try {
                    const response = await fetch(API_BOOK_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', Authorization: retToken() },
                        body: JSON.stringify({ action: 'BULK_CREATE', books }),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        toast.error(`Failed to upload books: ${errorData.message}`);
                        return;
                    }

                    toast.success('Books uploaded successfully!');
                } catch (error) {
                    toast.error('Failed to upload books. Please try again.');
                }
            });
        };

        reader.readAsText(file);
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
                            <h1>Bulk Upload Books</h1>
                        </div>
                    </div>

                    <div className="upload-section">
                        <label htmlFor="csv-upload" className="upload-btn">
                            Choose CSV File
                        </label>
                        <input
                            type="file"
                            id="csv-upload"
                            accept=".csv"
                            onChange={handleFileUpload}
                            style={{ display: 'none' }}
                        />
                    </div>

                    <ToastContainer />
                </main>
                <Footer />
            </section>
        </section>
    );
};

export default BulkUploadBook;
