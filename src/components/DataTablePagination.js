import React from 'react';
import '../styles/DataTable.css'; // Import the same styles

const DataTablePagination = ({ totalPages, currentPage, onPageChange }) => {
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-button ${currentPage === i ? 'active' : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return <div className="pagination-container">{renderPagination()}</div>;
};

export default DataTablePagination;
