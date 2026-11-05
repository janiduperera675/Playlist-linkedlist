import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

afterEach(() => { window.location.hash = ''; });

test('opens the library with a loading transition', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /life has a soundtrack/i })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: /enter your library/i }));
  expect(screen.getByRole('status')).toHaveTextContent('Opening your music library');
});
