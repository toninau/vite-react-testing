import AddNote from './AddNote';
import NotesList from './NotesList';

function NotesContainer() {
  return (
    <>
      <h2>Notes</h2>
      <NotesList />
      <AddNote />
    </>
  );
}

export default NotesContainer;
