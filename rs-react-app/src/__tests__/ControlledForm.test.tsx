import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ControlledForm } from '../components/ControlledForm.tsx';
import React from 'react';

type ActionState = Record<string, string | undefined>;
type FormAction = (
  prevState: ActionState,
  formData: FormData
) => Promise<ActionState>;

vi.mock('react', async () => {
  const actual = await vi.importActual<typeof React>('react');

  const useActionStateMock = vi.fn(
    (
      action: FormAction,
      initialState: ActionState
    ): [ActionState, (formData: FormData) => Promise<void>, boolean] => {
      let state = initialState;
      const dispatch = vi.fn(async (formData: FormData) => {
        const result = await action(state, formData);
        state = result;
      });
      return [state, dispatch, false];
    }
  );

  return {
    ...actual,
    useActionState: useActionStateMock,
  };
});

describe('ControlledForm Component', () => {
  let onSubmit: ReturnType<typeof vi.fn>;
  let onClose: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onSubmit = vi.fn();
    onClose = vi.fn();
    render(<ControlledForm onSubmit={onSubmit} onClose={onClose} />);
  });

  it('renders all required fields', () => {
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByRole('group', { name: /Gender/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields', async () => {
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/must start with an uppercase letter/i)
      ).toBeVisible();
      expect(screen.getByText(/Invalid email address/i)).toBeVisible();
      expect(
        screen.getByText(/Must contain a special character/i)
      ).toBeVisible();
      expect(screen.getByText(/Gender is required/i)).toBeVisible();
    });
  });

  it('validates password strength and matching', async () => {
    const passwordInput = screen.getByLabelText(/^Password$/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);

    await userEvent.type(passwordInput, 'weak');
    await userEvent.type(confirmPasswordInput, 'different');

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Must contain a special character/i)
      ).toBeVisible();
    });

    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'Str0ng@Pass');
    await userEvent.clear(confirmPasswordInput);
    await userEvent.type(confirmPasswordInput, 'Str0ng@Pass');

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(
        screen.queryByText(/Passwords must match/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/Must contain a special character/i)
      ).not.toBeInTheDocument();
    });
  });

  it('clears error when valid data is entered', async () => {
    const emailInput = screen.getByLabelText(/Email/i);

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/Invalid email address/i)).toBeVisible();
    });

    await userEvent.type(emailInput, 'valid@example.com');

    await waitFor(() => {
      expect(
        screen.queryByText(/Invalid email address/i)
      ).not.toBeInTheDocument();
    });
  });
});
