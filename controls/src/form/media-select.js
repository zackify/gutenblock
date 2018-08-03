const { Button } = wp.components;
const { MediaUpload } = wp.editor;

export default ({ name, attributes, onChange, beforeChange, label, ...props }) => (
  <div style={{ display: 'flex' }}>
    {attributes[name] ? (
      <img src={attributes[name]} style={{ height: 10, marginRight: 5, alignSelf: 'center' }} />
    ) : null}
    <MediaUpload
      type="image"
      {...props}
      value={attributes[name]}
      render={({ open }) => (
        <Button isPrimary onClick={open}>
          {label || 'Open Media Library'}
        </Button>
      )}
      onSelect={media => onChange(name, beforeChange ? beforeChange(media) : media.sizes.full.url)}
    />
  </div>
);
