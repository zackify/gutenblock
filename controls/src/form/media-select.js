const { Button } = wp.components;
const { MediaUpload } = wp.blocks;

export default ({ name, attributes, onChange, label }) => (
  <MediaUpload
    type="image"
    value={attributes[name]}
    render={({ open }) => (
      <Button isPrimary onClick={open}>
        {label || 'Open Media Library'}
      </Button>
    )}
    onSelect={media => onChange(name, media.sizes.full.url)}
  />
);
