import type { Note } from './types';
import Card from '@/components/Card';
import { useQuery } from '@tanstack/react-query';

type NoteItemProps = {
  title: string;
  text: string;
};

function NoteItem({ title, text }: NoteItemProps) {
  return (
    <Card>
      <h5>{title}</h5>
      <p>{text}</p>
    </Card>
  );
}

const getNotes = async (): Promise<Note[]> => {
  const result = await fetch('https://jsonplaceholder.typicode.com/api/notes');
  const data = await result.json();
  return data;
};

function NotesList() {
  const {
    isLoading,
    error,
    data: notes,
  } = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
  });

  if (isLoading) return <p>loading...</p>;
  if (error) return <p>error happened</p>;
  return (
    <div>
      {notes?.map((note) => (
        <NoteItem key={note.id} text={note.text} title={note.title} />
      ))}
    </div>
  );
}

export default NotesList;
