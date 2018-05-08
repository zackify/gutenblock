import { Input, Repeat, Editor } from 'gutenblock-controls';

const Edit = ({ attributes, setAttributes }) => {
  return (
    <div>
      <Editor>
        <Repeat title="Notes" max="50" addNew="Add Item" attribute="notes">
          <Input name="title" />
        </Repeat>
      </Editor>
    </div>
  );
};
