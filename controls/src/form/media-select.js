const { Button } = wp.components;
const { MediaUpload } = wp.blocks;

export default ({ name, attributes, onChange, beforeChange, label }) => (
  <MediaUpload
    type="image"
    value={attributes[name]}
    render={({ open }) => (
      <Button isPrimary onClick={open}>
        {label || 'Open Media Library'}
      </Button>
    )}
    onSelect={media =>
      onChange(name, beforeChange ? beforeChange(media) : media.sizes.full.url)
    }
  />
);
