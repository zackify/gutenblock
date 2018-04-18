import React from 'react';

const InspectorInput = ({
  attributes,
  setAttributes,
  name,
  label,
  onChange,
  type,
}) => (
  <div className="components-base-control__field">
    <label htmlFor={name} className="components-base-control__label">
      {label}
    </label>
    <input
      id={name}
      name={name}
      value={attributes[name]}
      type={type || 'string'}
      className="components-text-control__input"
      onChange={e => setAttributes({ [name]: e.target.value })}
    />
  </div>
);

export default InspectorInput;
