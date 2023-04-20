import { screen } from '@testing-library/react';

import { renderWithClient } from '@/test/test-utils';
import NotesList from './NotesList';

describe('<NotesList />', () => {
  test('displays notes', async () => {
    renderWithClient(<NotesList />);

    expect(screen.getByText('loading...')).toBeInTheDocument();
    expect(await screen.findByText('Note 1')).toBeInTheDocument();
  });
});
