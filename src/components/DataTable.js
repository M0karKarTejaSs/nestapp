import React, { useState, useEffect } from 'react';
import '../styles/DataTable.css'; // Add styles for the table

const DataTable = ({ title, columns, data, onEdit, onDelete, userId }) => {
  const [searchText, setSearchText] = useState(''); // State for search/filter input
  const [filteredData, setFilteredData] = useState([]);

  // Sync filteredData with the original data on component mount or data prop change
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  // Handle search/filter
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    const filtered = data.filter((row) =>
      columns.some(({ accessor }) => {
        const cellValue = row[accessor];
        return cellValue?.toString().toLowerCase().includes(value);
      })
    );

    setFilteredData(filtered);
  };

  return (
    <div className="table-data">
      <div className="order">
        <div className="head">
          <h3>{title}</h3>
          <div className="filter-container">
            <input
              type="text"
              placeholder="Search or filter..."
              value={searchText}
              onChange={handleSearch}
              className="search-input"
            />
            <i className="bx bx-search"></i>
            <i className="bx bx-filter"></i>
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {columns.map(({ header, accessor }, index) => (
                  <th key={accessor || index}>{header}</th>
                ))}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns.map(({ accessor }, colIndex) => (
                      <td key={colIndex}>
                        {row[accessor] !== undefined ? row[accessor] : '-'}
                      </td>
                    ))}
                    <td>
                      <i
                        onClick={() => onEdit(row)}
                        className="bi bi-pencil-square edit-icon"
                      ></i>
                      <i
                        onClick={() => onDelete(row.genreId, userId)}
                        className="bi bi-trash delete-icon"
                      ></i>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 1}>No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
