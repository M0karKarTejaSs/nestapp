import React, { useEffect, useState } from 'react';
import { retToken } from '../AuthToken';
import { jwtDecode } from 'jwt-decode';

const Navbar = ({ toggleSidebar, isSearchFormShown, handleSearchButtonClick, toggleDarkMode }) => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = retToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.sub);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  return (
    <nav>
      <i className="bx bx-menu" onClick={toggleSidebar}></i>
      <a href="#" className="nav-link">Dashboard</a>
      <form action="#" className={isSearchFormShown ? 'show' : ''}>
        <div className="form-input">
          {/* <input type="search" placeholder="Search..." />
          <button type="submit" className="search-btn" onClick={handleSearchButtonClick}>
            <i className={`bx ${isSearchFormShown ? 'bx-x' : 'bx-search'}`}></i>
          </button> */}
        </div>
      </form>
      <input type="checkbox" id="switch-mode" hidden />
      {/* <label htmlFor="switch-mode" className="switch-mode" onClick={toggleDarkMode}></label> */}
      {/* <a href="#" className="notification"><i className="bx bxs-bell"></i><span className="num">8</span></a> */}
      <a href="#" className="profile">
        <img src="/assets/user.png" alt="profile" />
        <span className="profile-name">{username || 'Guest'}</span>
      </a>
    </nav>
  );
}

export default Navbar;
