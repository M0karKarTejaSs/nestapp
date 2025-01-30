import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import handleLogout from '../components/Logout';
import Footer from './Footer';
const Sidebar = ({ isSidebarHidden }) => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: 'bi-bar-chart' },
    { name: 'Genre', icon: 'bi-grid' },
    { name: 'Book', icon: 'bi-book' },
    { name: 'Author', icon: 'bi-person' },
    // { name: 'Team', icon: 'bi-people' },
  ];

  const safeHandleLogout = () => {
    try {
      handleLogout();
      toast.success('Successfully logged out.');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error during logout. Please try again.');
    }
  };

  const isActive = (path) => location.pathname === `/${path}`;

  const renderMenuItem = (item) => (
    <li key={item.name} className={isActive(item.name.toLowerCase()) ? 'active' : ''}>
      <Link to={`/${item.name.toLowerCase()}`}>
        <i className={`bx ${item.icon}`} />
        <span className="text">{item.name}</span>
      </Link>
    </li>
  );

  return (
    <section id="sidebar" className={isSidebarHidden ? 'hide' : ''}>
      <a href="#" className="brand">
        <i className="bx bxs-book" />
        <span className="text">Nest Book</span>
      </a>
      <ul className="side-menu top">
        {menuItems.map(renderMenuItem)}
      </ul>
      <ul className="side-menu">
        {/* <li style={{ marginLeft: '1rem' }}>
          <Link to="/settings" className="settings">
            <i style={{ paddingRight: "0.5rem" }} className="bi-gear" />
            <span className="text">{isSidebarHidden ? '' : 'Settings'}</span>
          </Link>
        </li> */}

        <div className="divider" />

        <li style={{ marginLeft: '1rem' }}>
          <Link to="#" className="logout" onClick={safeHandleLogout}>
            <i style={{ paddingRight: "0.5rem" }} className="bi-box-arrow-right" />
            <span className="text">{isSidebarHidden ? '' : 'Logout'}</span>
          </Link>
        </li>
      </ul>
      <Footer />

    </section>
  );
};

export default Sidebar;
