import { useState, useEffect } from 'react';

export const useDashboard = () => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(window.innerWidth < 768);
  const [isSearchFormShown, setIsSearchFormShown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarHidden(window.innerWidth < 768);
      if (window.innerWidth > 576) setIsSearchFormShown(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarHidden((prev) => !prev);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    document.body.classList.toggle('dark', !isDarkMode);
  };

  const handleSearchButtonClick = (e) => {
    e.preventDefault();
    setIsSearchFormShown((prev) => !prev);
  };

  return {
    isSidebarHidden,
    isSearchFormShown,
    isDarkMode,
    toggleSidebar,
    toggleDarkMode,
    handleSearchButtonClick,
  };
};
