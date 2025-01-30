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

const API_URL = 'http://localhost:8080/api/author';

const Author = ({ toggleSidebar, isSidebarHidden, toggleDarkMode, isSearchFormShown, handleSearchButtonClick }) => {
    const [authors, setAuthors] = useState([]);
    const [isAddAuthor, setIsAddAuthor] = useState(false);
    const [currentAuthor, setCurrentAuthor] = useState(null);
    const [userId, setUserId] = useState(null);

    const columns = [
        { header: 'Index', accessor: 'index' },
        { header: 'Name', accessor: 'authorName' },
        { header: 'Biography', accessor: 'biography' },
    ];

    useEffect(() => {
        const token = retToken();
        if (token) {
            const { userId } = jwtDecode(token);
            setUserId(userId);
            fetchAuthors(userId);
        }
    }, []);

    const fetchAuthors = async (userId) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: retToken() },
                body: JSON.stringify({ action: 'READ_ALL', userId }),
            });
            if (response.ok) setAuthors(await response.json());
            else throw new Error();
        } catch {
            toast.error('Error fetching authors. Please try again.');
        }
    };

    const handleSave = async ({ name, biography }) => {
        const action = currentAuthor ? 'UPDATE' : 'CREATE';
        const payload = {
            action,
            authorName: name.trim(),
            biography: biography.trim(),
            userId,
            authorId: currentAuthor?.authorId,
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: retToken() },
                body: JSON.stringify(payload),
            });
            if (!response.ok) throw new Error();
            const updatedAuthor = await response.json();
            setAuthors((prev) =>
                action === 'UPDATE'
                    ? prev.map((a) => (a.authorId === updatedAuthor.authorId ? updatedAuthor : a))
                    : [...prev, updatedAuthor]
            );
            resetForm();
            toast.success(`Author ${action === 'UPDATE' ? 'updated' : 'added'} successfully!`);
        } catch {
            toast.error('Failed to save author. Please try again.');
        }
    };

    const handleDelete = async (authorId) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: retToken() },
                body: JSON.stringify({ action: 'DELETE', authorId, userId }),
            });
            if (!response.ok) throw new Error();
            setAuthors((prev) => prev.filter((author) => author.authorId !== authorId));
            toast.success('Author deleted successfully!');
        } catch {
            toast.error('Failed to delete author. Please try again.');
        }
    };

    const resetForm = () => {
        setIsAddAuthor(false);
        setCurrentAuthor(null);
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
                            <h1>Authors</h1>
                            <ul className="breadcrumb">
                                <li><a href="#">Authors</a></li>
                                <li><i className="bx bx-chevron-right"></i></li>
                                <li><a className="active" href="#">Home</a></li>
                            </ul>
                        </div>
                        <button onClick={() => setIsAddAuthor(true)} className="btn btn-success">Add Author</button>
                    </div>

                    {!isAddAuthor ? (
                        <DataTable
                            title="Authors List"
                            columns={columns}
                            data={authors.map((author, index) => ({
                                index: index + 1,
                                ...author,
                            }))}
                            onEdit={(author) => {
                                setCurrentAuthor(author);
                                setIsAddAuthor(true);
                            }}
                            onDelete={(authorId) => handleDelete(authorId)}
                        />
                    ) : (
                        <GenericForm
                            isEditMode={!!currentAuthor}
                            currentData={currentAuthor}
                            fields={[
                                { name: 'name', label: 'Name', placeholder: 'Enter Name', type: 'text', validation: { required: true } },
                                { name: 'biography', label: 'Biography', placeholder: 'Enter Biography', type: 'text', validation: { required: true } },
                            ]}
                            onSubmit={handleSave}
                            onCancel={resetForm}
                            formTitle={currentAuthor ? 'Edit Author' : 'Add Author'}
                        />
                    )}
                    <ToastContainer />
                </main>
                <Footer />
            </section>
        </section>
    );
};

export default Author;
