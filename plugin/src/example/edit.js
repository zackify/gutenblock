import { RichText } from 'gutenblock-controls';

const Edit = () => (
  <React.Fragment>
    <div style={{ backgroundColor: 'black' }}>
      <RichText name="title" style={{ color: 'white' }} />
    </div>
    <div style={{ backgroundColor: 'red' }}>
      <RichText name="description" style={{ color: 'white' }} />
    </div>
  </React.Fragment>
);
