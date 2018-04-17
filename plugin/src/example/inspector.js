import { Inspector, Repeat, RepeatInput } from 'gutenblock-controls';

export default () => (
  <Inspector>
    <Repeat title="Tabs" addNew="Add Tab" attribute="tabs">
      <RepeatInput name="title" />

      <Repeat title="Notes" addNew="Add Note" attribute="notes" max={3}>
        <RepeatInput name="heading" />
      </Repeat>
    </Repeat>
  </Inspector>
);
