import { render, screen } from '@testing-library/react';
import Header from '@/components/Header';

describe('Header Component', () => {
  it('renders the header correctly', () => {
    render(<Header />);
    const headerElement = screen.getByText(/My Next\.js App/i);
    expect(headerElement).toBeInTheDocument();
  });
});
