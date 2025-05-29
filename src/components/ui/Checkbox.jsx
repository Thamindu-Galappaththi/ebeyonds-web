import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ 
  checked, 
  onChange, 
  label, 
  disabled = false,
  className = '',
  ...props 
}) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <div 
          className={`w-[21px] h-[21px] border-2 rounded cursor-pointer flex items-center justify-center ${
            checked 
              ? 'bg-[#cc9601] border-[#cc9601]' 
              : 'bg-transparent border-[#b7b7b7]'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => !disabled && onChange && onChange({ target: { checked: !checked } })}
        >
          {checked && (
            <img
              src="/images/img_vector_white_a700.svg"
              alt="Check"
              className="w-[12px] h-[12px]"
            />
          )}
        </div>
      </div>
      {label && (
        <label 
          className="text-[#b7b7b7] text-[20px] font-medium leading-[25px] cursor-pointer"
          onClick={() => !disabled && onChange && onChange({ target: { checked: !checked } })}
        >
          {label}
        </label>
      )}
    </div>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.node,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Checkbox;