import { rest } from 'msw';
import type { Note } from '@/features/notes';

const notes: Note[] = [
  {
    id: 1,
    title: 'Note 1',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 2,
    title: 'Note 2',
    text: 'Nullam vel suscipit justo, vitae facilisis ex.',
  },
  {
    id: 3,
    title: 'Note 3',
    text: 'Integer cursus tortor vestibulum risus vehicula pellentesque.',
  },
  {
    id: 4,
    title: 'Note 4',
    text: 'Nam eget justo facilisis, pretium libero sit amet, rhoncus metus.',
  },
];

export const noteHandlers = [
  rest.get('*/api/notes', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(notes), ctx.delay(150));
  }),
  rest.post('*/api/notes', async (req, res, ctx) => {
    const body = await req.json();
    const response = {
      ...body,
      id: Math.floor(Math.random() * (1000 - 5) + 5),
    };
    return res(ctx.status(200), ctx.json(response), ctx.delay(150));
  }),
  rest.get('*/api/notes/:id', (req, res, ctx) => {
    const id = Number(req.params.id);
    const note = notes.find((channel) => channel.id === id);
    if (!note) {
      return res(ctx.status(404), ctx.delay(150));
    }
    return res(ctx.status(200), ctx.json(note), ctx.delay(150));
  }),
];
