
import { Input, Repeat } from 'gutenblock-controls';

const Edit = ({ attributes, setAttributes }) => {
  return (
    <div>
      <Repeat
        attributes={attributes}
        onChange={(name, value) => setAttributes({ [name]: value })}
        setAttributes={setAttributes}
        title="Notes"
        max="50"
        addNew="Add Item" attribute="notes"
      >
        <Input name="title" />
      </Repeat>
    </div>
  )
};