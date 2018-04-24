import { Async } from 'react-select';

export default ({ loadOptions, name, onChange, attributes, onDelete }) => (
  <Async
    style={{ marginTop: '5px' }}
    name={name}
    value={attributes ? attributes[name] : null}
    loadOptions={loadOptions}
    joinValues={attributes ? true : false}
    clearRenderer={() => (
      <div
        onClick={e => {
          e.stopPropagation();
          onDelete();
        }}
      >
        X
      </div>
    )}
    onChange={value => (value ? onChange(name, value.value) : null)}
  />
);
