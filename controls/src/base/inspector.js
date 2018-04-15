const { InspectorControls } = wp.blocks;
import { Consumer } from './context';

// Todo, use react context vs map when we add other inspector controls :)

export default ({ children, isSelected }) => (
  <Consumer>
    {data =>
      data.isSelected ? <InspectorControls>{children}</InspectorControls> : null
    }
  </Consumer>
);
