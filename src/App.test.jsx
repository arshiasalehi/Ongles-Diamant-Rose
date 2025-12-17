import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the home hero headline', async () => {
    render(<App />);
    expect(await screen.findByRole('heading', { name: /best nails for best moments/i })).toBeInTheDocument();
  });
});
