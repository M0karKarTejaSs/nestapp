import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const GenericForm = ({
  isEditMode,
  currentData,
  fields,
  onSubmit,
  onCancel,
  formTitle,
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode && currentData) {
      setFormData(currentData);
    } else {
      const initialFormData = fields.reduce((acc, field) => {
        acc[field.name] = field.defaultValue || '';
        return acc;
      }, {});
      setFormData(initialFormData);
    }
  }, [isEditMode, currentData, fields]);

  const validateField = (fieldName, value) => {
    const field = fields.find((f) => f.name === fieldName);
    const validation = field?.validation;
    if (!validation) return;

    let error = '';
    if (validation.required && !value?.toString().trim()) {
      error = validation.message || `${field.label} is required`;
    } else if (validation.pattern && !validation.pattern.test(value)) {
      error = validation.message || `${field.label} is invalid`;
    } else if (validation.min !== undefined && value < validation.min) {
      error = validation.message || `${field.label} must be at least ${validation.min}`;
    } else if (validation.max !== undefined && value > validation.max) {
      error = validation.message || `${field.label} must be at most ${validation.max}`;
    } else if (validation.maxLength !== undefined && value.length > validation.maxLength) {
      error = validation.message || `${field.label} must be less than ${validation.maxLength} characters`;
    }

    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const handleChange = (e, fieldName) => {
    let value = e.target.value;

    const field = fields.find((f) => f.name === fieldName);


    if (field.type === 'number') {
      value = value.replace(/\D/g, '');
    }

    if (field.type === 'text') {
      value = value.replace(/[0-9]/g, '');
    }


    if (['title', 'publisher'].includes(fieldName)) {
      value = value.replace(/[0-9]/g, '');
    }

    setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
    validateField(fieldName, value);
  };

  const handleSubmit = () => {
    const newErrors = {};
    fields.forEach((field) => {
      const value = formData[field.name];
      const validation = field.validation;
      if (validation) {
        if (validation.required && !String(value).trim()) {
          newErrors[field.name] = validation.message || `${field.label} is required`;
        } else if (validation.pattern && !validation.pattern.test(value)) {
          newErrors[field.name] = validation.message || `${field.label} is invalid`;
        } else if (validation.min !== undefined && value < validation.min) {
          newErrors[field.name] = validation.message || `${field.label} must be at least ${validation.min}`;
        } else if (validation.max !== undefined && value > validation.max) {
          newErrors[field.name] = validation.message || `${field.label} must be at most ${validation.max}`;
        } else if (validation.maxLength !== undefined && value.length > validation.maxLength) {
          newErrors[field.name] = validation.message || `${field.label} must be less than ${validation.maxLength} characters`;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fix the errors in the form.');
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="overlay">
      <div className="add-genre-form" style={{ width: '500px', padding: '10px' }}>
        <h2>{formTitle}</h2>
        <div className="form-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {fields.map((field) => (
            <div key={field.name} style={{ flex: '1 1 45%', marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}>
                {field.label}
              </label>
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
                  {field.options.map((option) => (
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
                  disabled={isEditMode && field.name === 'title'}
                  style={{
                    width: '100%',
                    padding: '6px',
                    fontSize: '12px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                />
              )}
              {errors[field.name] && (
                <small style={{ color: 'red', fontSize: '11px' }}>{errors[field.name]}</small>
              )}
            </div>
          ))}
        </div>
        <div className="button-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            onClick={handleSubmit}
            className="btn btn-success"
            style={{ padding: '6px 10px', fontSize: '12px' }}
          >
            {isEditMode ? 'Save Changes' : 'Add'}
          </button>
          <button
            onClick={onCancel}
            className="btn btn-secondary"
            style={{ padding: '6px 10px', fontSize: '12px' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenericForm;
