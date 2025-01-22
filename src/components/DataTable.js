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
            {columns.map(({ header }, index) => (
              <th key={index}>{header}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map(({ accessor }, colIndex) => (
                <td key={colIndex}>{row[accessor]}</td>
              ))}
              <td>
                <i onClick={() => onEdit(row)} className="bi bi-pencil-square edit-icon"></i>
                <i onClick={() => onDelete(row)} className="bi bi-trash delete-icon"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default DataTable;
