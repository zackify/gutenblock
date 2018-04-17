import Inspector from './inspector';
import Tabs from './components/tabs';
import { RichText } from 'gutenblock-controls';

const Edit = ({ attributes }) => (
  <div>
    <div>
      <RichText
        tagName="h1"
        name="title"
        placeholder="Section Title: Add tabs to the right ->"
      />
    </div>
    <Tabs tabs={attributes.tabs} />
    <Inspector />
  </div>
);
