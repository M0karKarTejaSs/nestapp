// src/components/GenericForm.js
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const GenericForm = ({ 
  isEditMode, 
  currentData, 
  fields, 
  onSubmit, 
  onCancel, 
  formTitle 
}) => {
  const [formData, setFormData] = useState({});

    

  // Initialize form data when the component loads or when data changes
  useEffect(() => {
    if (isEditMode && currentData) {
      setFormData(currentData);
    } else {
      // Initialize empty form data for new entry
      const initialFormData = fields.reduce((acc, field) => {
        acc[field.name] = '';
        return acc;
      }, {});
      setFormData(initialFormData);
    }
  }, [isEditMode, currentData, fields]);

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = () => {
    // Validate form fields
    const isValid = fields.every(field => formData[field.name]);
    if (!isValid) return toast.error('Please fill all fields.');

    onSubmit(formData);
  };

  return (
    <div className="overlay">
      <div className="add-genre-form">
        <h2>{formTitle}</h2>
        {fields.map(field => (
          <div key={field.name}>
            <label>{field.label}</label>
            <input
              type="text"
              placeholder={field.placeholder}
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(e, field.name)}
            />
          </div>
        ))}
        <div className="button-container">
          <button onClick={handleSubmit} className="btn btn-success">
            {isEditMode ? 'Save Changes' : 'Add'}
          </button>
          <button onClick={onCancel} className="btn btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default GenericForm;
