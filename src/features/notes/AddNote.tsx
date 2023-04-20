import { useReducer } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note } from './types';

const postNote = async (note: PostNote) => {
  const result = await fetch('https://jsonplaceholder.typicode.com/api/notes', {
    method: 'POST',
    body: JSON.stringify(note),
  });
  const data = await result.json();
  return data;
};

type PostNote = Omit<Note, 'id'>;

function AddNote() {
  const [note, updateNote] = useReducer(
    (state: PostNote, partialState: Partial<PostNote>) => ({
      ...state,
      ...partialState,
    }),
    { title: '', text: '' }
  );

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postNote,
    onSuccess: (newNote) => {
      // update the list we are currently on instantly
      queryClient.setQueryData(['notes'], (notes: Note[] = []) => {
        return [...notes, newNote];
      });
      // invalidate all the lists, but don't refetch the active one
      queryClient.invalidateQueries({
        queryKey: ['notes'],
        refetchType: 'none',
      });
    },
  });

  const handleClick = () => {
    mutation.mutate({
      title: note.title,
      text: note.text,
    });
    updateNote({ text: '', title: '' });
  };

  return (
    <div>
      <h4>Add note</h4>
      <label htmlFor="note-title">title</label>
      <input
        id="note-title"
        onChange={(e) => updateNote({ title: e.target.value })}
        value={note.title}
      />
      <label htmlFor="note-text">text</label>
      <textarea
        id="note-text"
        onChange={(e) => updateNote({ text: e.target.value })}
        value={note.text}
      />
      <button type="button" onClick={handleClick}>
        Add
      </button>
    </div>
  );
}

export default AddNote;
