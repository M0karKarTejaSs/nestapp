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
      <div className="add-genre-form" style={{ width: '500px', padding: '10px' }}>
        <h2>{formTitle}</h2>
        <div className="form-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {fields.map(field => (
            <div key={field.name} style={{ flex: '1 1 45%', marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}>{field.label}</label>
              {field.type === 'dropdown' ? (
                <select
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(e, field.name)}
                  style={{
                    width: '100%',
                    padding: '6px',
                    fontSize: '12px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type || 'text'}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(e, field.name)}
                  style={{
                    width: '100%',
                    padding: '6px',
                    fontSize: '12px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="button-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={handleSubmit} className="btn btn-success" style={{ padding: '6px 10px', fontSize: '12px' }}>
            {isEditMode ? 'Save Changes' : 'Add'}
          </button>
          <button onClick={onCancel} className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '12px' }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenericForm;
