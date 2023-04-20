import { screen } from '@testing-library/react';
import { renderWithClient } from '@/test/test-utils';
import NotesContainer from './NotesContainer';

describe('<NotesContainer />', () => {
  test('displays notes', async () => {
    renderWithClient(<NotesContainer />);

    expect(screen.getByText('loading...')).toBeInTheDocument();
    expect(await screen.findByText('Note 1')).toBeInTheDocument();
  });

  test('adds new note', async () => {
    const { user } = renderWithClient(<NotesContainer />);

    await user.type(screen.getByLabelText('title'), 'Note 5');
    await user.type(screen.getByLabelText('text'), 'adsfasdf');
    await user.click(screen.getByRole('button'));

    expect(await screen.findByRole('heading', { name: 'Note 5' }));
    expect(await screen.findByText('adsfasdf'));
  });
});
