import React from 'react';
import PropTypes from 'prop-types';

const Textarea = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  disabled = false,
  rows = 4,
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
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={`bg-[#3c3c3c] rounded-[5px] px-4 py-3 text-white placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-[#cc9601] resize-vertical ${className}`}
        {...props}
      />
    </div>
  );
};

Textarea.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  rows: PropTypes.number,
  className: PropTypes.string,
};

export default Textarea;