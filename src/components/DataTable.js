import React, { useState, useEffect } from 'react';
import '../styles/DataTable.css'; // Import styles
import DataTablePagination from '../components/DataTablePagination.js';
import { downloadCSV } from '../components/csvUtils'; // Import the utility function

const DataTable = ({ title, columns, data, onEdit, onDelete, userId }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

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
    setCurrentPage(1);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="table-data">
      <div className="order">
        <div className="head">
          <h3>{title}</h3>
          <div className="filter-container">
            <div className="download-button-container">
              {/* <button
                onClick={() => downloadCSV(title, columns, filteredData)}
                className="download-csv-btn display-none"
              >
                Download CSV
              </button> */}
            </div>
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
              {currentData.length > 0 ? (
                currentData.map((row, rowIndex) => (
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
                        onClick={() => {
                          const identifier = row.bookId || row.genreId || row.authorId;
                          if (identifier) {
                            onDelete(identifier, userId);
                          } else {
                            console.error('Error: Missing bookId or genreId');
                          }
                        }}
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
        {filteredData.length > rowsPerPage && (
          <DataTablePagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

      </div>
    </div>
  );
};

export default DataTable;
