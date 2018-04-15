import React from 'react';
import { Consumer } from '../base/context';

const InspectorInput = ({ name, label, onChange, type }) => (
  <Consumer>
    {data => (
      <div className="components-base-control__field">
        <label htmlFor={name} className="components-base-control__label">
          {label}
        </label>
        <input
          id={name}
          name={name}
          value={data.attributes[name]}
          type={type || 'string'}
          className="components-text-control__input"
          onChange={e => data.setAttributes({ [name]: e.target.value })}
        />
      </div>
    )}
  </Consumer>
);

export default InspectorInput;
