import { Consumer } from './context';

import React from 'react';

export default ({ render }) => (
  <Consumer>{data => render(data.attributes, data.setAttributes)}</Consumer>
);
