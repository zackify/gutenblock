import Note from './note';

export default ({ tabs }) =>
  tabs.map(tab => (
    <div>
      <h2>Tab: {tab.title}</h2>
      {tab.notes ? tab.notes.map(note => <Note note={note} />) : null}
    </div>
  ));
