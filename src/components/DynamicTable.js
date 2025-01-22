import React from 'react';

const DynamicTable = ({ title, columns, data, onEdit, onDelete }) => (
  <div className="table-data">
    <div className="order">
      <div className="head">
        <h3>{title}</h3>
      </div>
      <table>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.header}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>{row[col.accessor]}</td>
              ))}
              <td>
                <i
                  onClick={() => onEdit(row)}
                  className="bi bi-pencil-square edit-icon"
                ></i>
                <i
                  onClick={() => onDelete(row)}
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

export default DynamicTable;
