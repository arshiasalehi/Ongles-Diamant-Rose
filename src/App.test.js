import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the home hero headline', async () => {
  render(<App />);
  expect(await screen.findByRole('heading', { name: /best nails for best moments/i })).toBeInTheDocument();
});
