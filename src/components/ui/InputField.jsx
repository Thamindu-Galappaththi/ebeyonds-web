import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = false,
  disabled = false,
  className = '',
  ...props 
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <label className="text-[#b7b7b7] text-[18px] font-normal leading-[25px] font-open-sans">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`bg-[#3c3c3c] rounded-[5px] px-4 py-3 text-white placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-[#cc9601] ${className}`}
        {...props}
      />
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default InputField;