import React from 'react';
const { InspectorControls, MediaUpload } = wp.blocks;

export default ({ children, setAttributes, attributes, isSelected }) =>
  isSelected ? (
    <InspectorControls>
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          setAttributes,
          attributes,
        })
      )}
    </InspectorControls>
  ) : null;
