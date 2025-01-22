import React from 'react';

const DataTable = ({ title, columns, data, onEdit, onDelete }) => (
  <div className="table-data">
    <div className="order">
      <div className="head">
        <h3>{title}</h3>
      </div>
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
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map(({ accessor }, colIndex) => {
                // Handle cases where the value might be an object
                const value = row[accessor];
                let displayValue = value;

                // If the value is an object, render a specific property (e.g., 'genreName')
                if (typeof value === 'object' && value !== null) {
                  displayValue = value.genreName || value; // Adjust this to match the properties of the object
                }

                return (
                  <td key={colIndex}>
                    {displayValue !== undefined ? displayValue : '-'}
                  </td>
                );
              })}
              <td>
                <i
                  onClick={() => onEdit(row)}
                  className="bi bi-pencil-square edit-icon"
                ></i>
                <i
                  onClick={() => onDelete(row.bookId)} // Pass bookId for deletion
                  className="bi bi-trash delete-icon"
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default DataTable;
