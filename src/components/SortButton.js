import React from 'react';

const SortButton = ({ onSort, columnKey, currentSort }) => {
  const handleSort = () => {
    onSort(columnKey);
  };
  const getSortIcon = () => {
    if (currentSort.key === columnKey) {
      return currentSort.direction === 'asc' ? '↑' : '↓';
    }
    return '↓';
    // return '↓';
  };

  return (
    <button
      onClick={handleSort}
      style={{
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        fontSize: '16px',
      }}
    >
      {getSortIcon()}
    </button>
  );
};

export default SortButton;
