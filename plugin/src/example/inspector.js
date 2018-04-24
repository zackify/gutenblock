import { Inspector, Repeat, Input } from 'gutenblock-controls';

export default () => (
  <Inspector>
    <Repeat title="Tabs" addNew="Add Tab" attribute="tabs">
      <Input name="title" />

      <Repeat title="Notes" addNew="Add Note" attribute="notes" max={3}>
        <Input name="heading" />
      </Repeat>
    </Repeat>
  </Inspector>
);
