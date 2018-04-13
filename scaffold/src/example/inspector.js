import React from 'react';
const { Button } = wp.components;
const { MediaUpload } = wp.blocks;
import { Inspector, Input, Form } from 'gutenblock/controls';

export default props => (
  <Inspector {...props}>
    <Form>
      <Input name="title" label="Title" />
    </Form>

    <MediaUpload
      type="image"
      value={props.attributes.image}
      render={({ open }) => (
        <Button isPrimary onClick={open}>
          Open Media Library
        </Button>
      )}
      onSelect={media => props.setAttributes({ image: media.sizes.full.url })}
    />
  </Inspector>
);
