export default ({ attributes }) => <div>
    <h1>Notes:</h1>
    <ul>
        {attributes.notes.map(note => {
            return (
                <li> {note.title}</li>
            )
        })}
    </ul>
</div>;