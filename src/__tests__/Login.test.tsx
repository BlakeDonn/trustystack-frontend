import { render, screen, fireEvent } from '@testing-library/react';
import Login from '@/components/Login';
import { signIn } from 'next-auth/react';
import { vi } from 'vitest';

vi.mock('next-auth/react');

describe('Login Component', () => {
  it('calls signIn on form submission', async () => {
    const mockSignIn = vi.mocked(signIn);
    mockSignIn.mockResolvedValue({ ok: true });

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByText(/Login/i));

    expect(mockSignIn).toHaveBeenCalledWith('credentials', {
      redirect: false,
      email: 'test@example.com',
      password: 'password123',
      callbackUrl: '/',
    });
  });
}); 