import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import handleLogout from '../components/Logout';

const Sidebar = ({ isSidebarHidden }) => {
  const location = useLocation(); // To highlight the active link

  const menuItems = [
    { name: 'Dashboard', icon: 'bxs-dashboard' },
    { name: 'Genre', icon: 'bxs-category' },
    { name: 'Book', icon: 'bxs-book' },
    { name: 'Author', icon: 'bxs-user' },
    { name: 'Team', icon: 'bxs-group' },
  ];

  return (
    <section id="sidebar" className={isSidebarHidden ? 'hide' : ''}>
      <a href="#" className="brand">
        <i className="bx bxs-book"></i>
        <span className="text">Nest Book</span>
      </a>
      <ul className="side-menu top">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === `/${item.name.toLowerCase()}`;
          return (
            <li key={index} className={isActive ? 'active' : ''}>
              <Link to={`/${item.name.toLowerCase()}`}>
                <i className={`bx ${item.icon}`}></i>
                <span className="text">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <ul className="side-menu">
        <li>
          <Link to="/settings">
            <i className="bx bxs-cog"></i>
            <span className="text">Settings</span>
          </Link>
        </li>
        <li>
          <Link to="#" className="logout" onClick={handleLogout}>
            <i className="bx bxs-log-out-circle"></i>
            <span className="text">Logout</span>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
