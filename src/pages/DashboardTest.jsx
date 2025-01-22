// import React, { useState, useEffect, useRef } from 'react';
// import '../styles/Dash.css';

// const DashboardTest = () => {
//     const [isSidebarHidden, setIsSidebarHidden] = useState(window.innerWidth < 768);
//     const [isSearchFormShown, setIsSearchFormShown] = useState(false);
//     const [isDarkMode, setIsDarkMode] = useState(false);

//     const sidebarRef = useRef(null);
//     const searchFormRef = useRef(null);
//     const searchButtonIconRef = useRef(null);

//     // Toggle active menu item
//     useEffect(() => {
//         const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
//         allSideMenu.forEach((item) => {
//             const li = item.parentElement;
//             item.addEventListener('click', () => {
//                 allSideMenu.forEach((i) => {
//                     i.parentElement.classList.remove('active');
//                 });
//                 li.classList.add('active');
//             });
//         });
//     }, []);

//     // Toggle Sidebar
//     const toggleSidebar = () => {
//         setIsSidebarHidden((prev) => !prev);
//     };

//     // Handle search button toggle
//     const handleSearchButtonClick = (e) => {
//         if (window.innerWidth < 576) {
//             e.preventDefault();
//             setIsSearchFormShown((prev) => !prev);
//         }
//     };

//     // Sync search button icon
//     useEffect(() => {
//         if (searchFormRef.current && searchButtonIconRef.current) {
//             if (isSearchFormShown) {
//                 searchButtonIconRef.current.classList.replace('bx-search', 'bx-x');
//             } else {
//                 searchButtonIconRef.current.classList.replace('bx-x', 'bx-search');
//             }
//         }
//     }, [isSearchFormShown]);

//     // Handle window resize
//     useEffect(() => {
//         const handleResize = () => {
//             if (window.innerWidth > 576) {
//                 setIsSearchFormShown(false);
//             }
//             setIsSidebarHidden(window.innerWidth < 768);
//         };

//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     // Toggle Dark Mode
//     const toggleDarkMode = () => {
//         setIsDarkMode((prev) => !prev);
//     };

//     useEffect(() => {
//         if (isDarkMode) {
//             document.body.classList.add('dark');
//         } else {
//             document.body.classList.remove('dark');
//         }
//     }, [isDarkMode]);




//     return (
//         <section id="dashboard">
//             {/* SIDEBAR */}
//             <section id="sidebar">
//                 <a href="#" className="brand">
//                     <i className="bx bxs-smile"></i>
//                     <span className="text">AdminHub</span>
//                 </a>
//                 <ul className="side-menu top">
//                     <li className="active">
//                         <a href="#">
//                             <i className="bx bxs-dashboard"></i>
//                             <span className="text">Dashboard</span>
//                         </a>
//                     </li>
//                     <li>
//                         <a href="#">
//                             <i className="bx bxs-shopping-bag-alt"></i>
//                             <span className="text">My Store</span>
//                         </a>
//                     </li>
//                     <li>
//                         <a href="#">
//                             <i className="bx bxs-doughnut-chart"></i>
//                             <span className="text">Analytics</span>
//                         </a>
//                     </li>
//                     <li>
//                         <a href="#">
//                             <i className="bx bxs-message-dots"></i>
//                             <span className="text">Message</span>
//                         </a>
//                     </li>
//                     <li>
//                         <a href="#">
//                             <i className="bx bxs-group"></i>
//                             <span className="text">Team</span>
//                         </a>
//                     </li>
//                 </ul>
//                 <ul className="side-menu">
//                     <li>
//                         <a href="#">
//                             <i className="bx bxs-cog"></i>
//                             <span className="text">Settings</span>
//                         </a>
//                     </li>
//                     <li>
//                         <a href="#" className="logout">
//                             <i className="bx bxs-log-out-circle"></i>
//                             <span className="text">Logout</span>
//                         </a>
//                     </li>
//                 </ul>
//             </section>
//             {/* SIDEBAR */}

//             {/* CONTENT */}
//             <section id="content">
//                 {/* NAVBAR */}
//                 <nav>
//                     <i className="bx bx-menu"></i>
//                     <a href="#" className="nav-link">Categories</a>
//                     <form action="#">
//                         <div className="form-input">
//                             <input type="search" placeholder="Search..." />
//                             <button type="submit" className="search-btn">
//                                 <i className="bx bx-search"></i>
//                             </button>
//                         </div>
//                     </form>
//                     <input type="checkbox" id="switch-mode" hidden />
//                     <label htmlFor="switch-mode" className="switch-mode"></label>
//                     <a href="#" className="notification">
//                         <i className="bx bxs-bell"></i>
//                         <span className="num">8</span>
//                     </a>
//                     <a href="#" className="profile">
//                         <img src="img/people.png" alt="profile" />
//                     </a>
//                 </nav>
//                 {/* NAVBAR */}

//                 {/* MAIN */}
//                 <main>
//                     <div className="head-title">
//                         <div className="left">
//                             <h1>Dashboard</h1>
//                             <ul className="breadcrumb">
//                                 <li>
//                                     <a href="#">Dashboard</a>
//                                 </li>
//                                 <li><i className="bx bx-chevron-right"></i></li>
//                                 <li>
//                                     <a className="active" href="#">Home</a>
//                                 </li>
//                             </ul>
//                         </div>
//                         <a href="#" className="btn-download">
//                             <i className="bx bxs-cloud-download"></i>
//                             <span className="text">Download PDF</span>
//                         </a>
//                     </div>

//                     <ul className="box-info">
//                         <li>
//                             <i className="bx bxs-calendar-check"></i>
//                             <span className="text">
//                                 <h3>1020</h3>
//                                 <p>New Order</p>
//                             </span>
//                         </li>
//                         <li>
//                             <i className="bx bxs-group"></i>
//                             <span className="text">
//                                 <h3>2834</h3>
//                                 <p>Visitors</p>
//                             </span>
//                         </li>
//                         <li>
//                             <i className="bx bxs-dollar-circle"></i>
//                             <span className="text">
//                                 <h3>$2543</h3>
//                                 <p>Total Sales</p>
//                             </span>
//                         </li>
//                     </ul>

//                     <div className="table-data">
//                         <div className="order">
//                             <div className="head">
//                                 <h3>Recent Orders</h3>
//                                 <i className="bx bx-search"></i>
//                                 <i className="bx bx-filter"></i>
//                             </div>
//                             <table>
//                                 <thead>
//                                     <tr>
//                                         <th>User</th>
//                                         <th>Date Order</th>
//                                         <th>Status</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     <tr>
//                                         <td>
//                                             <img src="img/people.png" alt="John Doe" />
//                                             <p>John Doe</p>
//                                         </td>
//                                         <td>01-10-2021</td>
//                                         <td><span className="status completed">Completed</span></td>
//                                     </tr>
//                                     <tr>
//                                         <td>
//                                             <img src="img/people.png" alt="John Doe" />
//                                             <p>John Doe</p>
//                                         </td>
//                                         <td>01-10-2021</td>
//                                         <td><span className="status pending">Pending</span></td>
//                                     </tr>
//                                     <tr>
//                                         <td>
//                                             <img src="img/people.png" alt="John Doe" />
//                                             <p>John Doe</p>
//                                         </td>
//                                         <td>01-10-2021</td>
//                                         <td><span className="status process">Process</span></td>
//                                     </tr>
//                                     <tr>
//                                         <td>
//                                             <img src="img/people.png" alt="John Doe" />
//                                             <p>John Doe</p>
//                                         </td>
//                                         <td>01-10-2021</td>
//                                         <td><span className="status pending">Pending</span></td>
//                                     </tr>
//                                     <tr>
//                                         <td>
//                                             <img src="img/people.png" alt="John Doe" />
//                                             <p>John Doe</p>
//                                         </td>
//                                         <td>01-10-2021</td>
//                                         <td><span className="status completed">Completed</span></td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                         </div>
//                         <div className="todo">
//                             <div className="head">
//                                 <h3>Todos</h3>
//                                 <i className="bx bx-plus"></i>
//                                 <i className="bx bx-filter"></i>
//                             </div>
//                             <ul className="todo-list">
//                                 <li className="completed">
//                                     <p>Todo List</p>
//                                     <i className="bx bx-dots-vertical-rounded"></i>
//                                 </li>
//                                 <li className="completed">
//                                     <p>Todo List</p>
//                                     <i className="bx bx-dots-vertical-rounded"></i>
//                                 </li>
//                                 <li className="not-completed">
//                                     <p>Todo List</p>
//                                     <i className="bx bx-dots-vertical-rounded"></i>
//                                 </li>
//                                 <li className="completed">
//                                     <p>Todo List</p>
//                                     <i className="bx bx-dots-vertical-rounded"></i>
//                                 </li>
//                                 <li className="not-completed">
//                                     <p>Todo List</p>
//                                     <i className="bx bx-dots-vertical-rounded"></i>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </main>
//                 {/* MAIN */}
//             </section>
//             {/* CONTENT */}
//         </section>
//     );
// };

// export default DashboardTest;




// // import React, { useState, useEffect, useRef } from "react";
// // import "../App.css";
// // import Navbar from "../components/Navbar";
// // import Footer from "../components/Footer";
// // import Book from "../components/Book";
// // import Genre from "../components/Genre"
// // import MainContent from "../components/MainContent";
// // const DashboardTest = () => {
// //     const [isIdle, setIsIdle] = useState(false);
// //     const [currentPage, setCurrentPage] = useState("Home");

// //     const TIMEOUT_PERIOD = 1000 * 120 ;
// //     const idleTimer = useRef(null);

// //     const logoutUser = () => {
// //         localStorage.removeItem("authToken");
// //         window.location.replace("/");
// //         localStorage.clear("AuthToken");
// //         alert("Session expired. You have been logged out due to inactivity.");
// //     };

// //     const resetIdleTimer = () => {
// //         if (idleTimer.current) {
// //             clearTimeout(idleTimer.current);
// //         }
// //         idleTimer.current = setTimeout(() => {
// //             setIsIdle(true);
// //             logoutUser();
// //         }, TIMEOUT_PERIOD);
// //     };

// //     useEffect(() => {
// //         window.addEventListener("mousemove", resetIdleTimer);
// //         window.addEventListener("keydown", resetIdleTimer);
// //         window.addEventListener("click", resetIdleTimer);

// //         return () => {
// //             window.removeEventListener("mousemove", resetIdleTimer);
// //             window.removeEventListener("keydown", resetIdleTimer);
// //             window.removeEventListener("click", resetIdleTimer);
// //             if (idleTimer.current) {
// //                 clearTimeout(idleTimer.current);
// //             }
// //         };
// //     }, []);

// //     // Page Component Mapping
// //     const pageComponents = {
// //         Home: <MainContent />,
// //         Book: <Book />,
// //         Genre: <Genre />,
// //         Profile: <div>View your Profile here!</div>,
// //     };

// //     const renderContent = () => {
// //         if (currentPage === "Logout") {
// //             logoutUser();
// //             return null;
// //         }
// //         return pageComponents[currentPage] || <div>Page Not Found</div>;
// //     };

// //     // Menu Items (These can eventually be fetched from a database)
// //     const menuItems = [
// //         { id: 1, key: "Home", label: "Home" },
// //         { id: 2, key: "Book", label: "Book" },
// //         { id: 3, key: "Genre", label: "Genre" },
// //         { id: 4, key: "Profile", label: "Profile" },
// //         { id: 5, key: "Logout", label: "Logout" },
// //     ];

// //     return (
// //         <div className="container-scroller">
// //             <div className="sidebar">
// //                 <h2 className="sidebar-title">Book Dashboard</h2>
// //                 <ul className="sidebar-menu">
// //                     {menuItems.map((item) => (
// //                         <li
// //                             key={item.id}
// //                             className="menu-item"
// //                             onClick={() => setCurrentPage(item.key)}
// //                         >
// //                             <a href={`#${item.key.toLowerCase()}`}>{item.label}</a>
// //                         </li>
// //                     ))}
// //                 </ul>
// //             </div>

// //             <div className="container-fluid page-body-wrapper">
// //                 <Navbar />

// //                 <div className="main-panel">{renderContent()}</div>

// //                 <Footer />
// //             </div>
// //         </div>
// //     );
// // };

// // export default DashboardTest;