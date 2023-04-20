import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('<Card />', () => {
  test("renders card's content", () => {
    render(
      <Card>
        <p>text</p>
      </Card>
    );

    expect(screen.getByText('text')).toBeInTheDocument();
  });
});
