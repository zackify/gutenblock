const { InspectorControls } = wp.blocks;
import { Consumer } from './context';

// Todo, use react context vs map when we add other inspector controls :)

export default ({ children }) => (
  <Consumer>
    {data =>
      data.isSelected ? (
        <InspectorControls>
          {React.Children.map(children, child =>
            React.cloneElement(child, {
              setAttributes: data.setAttributes,
              attributes: data.attributes,
            })
          )}
        </InspectorControls>
      ) : null
    }
  </Consumer>
);
