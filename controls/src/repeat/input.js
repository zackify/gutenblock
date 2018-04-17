import React from 'react';

const RepeatInput = ({
  name,
  label,
  onChange,
  onDelete,
  type,
  attributes,
  setAttributes,
}) => (
  <div className="components-base-control__field">
    <label htmlFor={name} className="components-base-control__label">
      {label}
    </label>
    <div style={{ display: 'flex' }}>
      <input
        id={name}
        name={name}
        value={attributes ? attributes[name] : ''}
        type={type || 'string'}
        className="components-text-control__input"
        onChange={e => onChange(name, e.target.value)}
      />
      <div style={{ alignSelf: 'center' }} onClick={() => onDelete()}>
        X
      </div>
    </div>
  </div>
);

export default RepeatInput;
