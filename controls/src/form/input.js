import React from 'react';

const Input = ({ name, type, label, onChange, attributes, ...props }) => (
  <div className="components-base-control__field">
    <label htmlFor={name} className="components-base-control__label">
      {label}
    </label>
    <input
      {...props}
      id={name}
      name={name}
      type={type || 'string'}
      className="components-text-control__input"
      value={attributes[name]}
      onChange={e => onChange(name, e.target.value)}
    />
  </div>
);

export default Input;
