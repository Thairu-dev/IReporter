import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PasswordInput = ({
  name,
  placeholder,
  handleOnChange,
  label = '',
  labelText = '',
  pattern = null,
  title = null,
  minLength = null
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <label htmlFor={label}>
      {labelText}
      <div className="input-wrapper">
        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          placeholder={placeholder}
          style={{ borderRight: 0 }}
          onChange={event => handleOnChange(event)}
          required
          pattern={pattern}
          title={title}
          minLength={minLength}
        />
        <i
          className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'} icon`}
          onClick={() => setShowPassword(!showPassword)}
        />
      </div>
    </label>
  );
};

PasswordInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  labelText: PropTypes.string,
  pattern: PropTypes.string,
  title: PropTypes.string,
  minLength: PropTypes.string,
};

export default PasswordInput;
