import { Async } from 'react-select';

export default ({ loadOptions, name, onChange, attributes }) => (
  <Async
    style={{ marginTop: '5px' }}
    name={name}
    value={attributes ? attributes[name] : null}
    loadOptions={loadOptions}
    joinValues={attributes ? true : false}
    onChange={value => (value ? onChange(name, value.value) : null)}
  />
);
