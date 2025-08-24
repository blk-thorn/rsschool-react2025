import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ControlledForm } from '../components/ControlledForm';
import React from 'react';
import type { FormData } from '../utils/validation';

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
    expect(
      screen.getByLabelText('Password', { selector: 'input' })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByRole('group', { name: /Gender/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields', async () => {
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Name must start with an uppercase letter/i)
      ).toBeVisible();
      expect(screen.getByText(/Invalid email address/i)).toBeVisible();
      expect(
        screen.getByText(/Password must be at least 8 characters long/i)
      ).toBeVisible();
      expect(screen.getByText(/Gender is required/i)).toBeVisible();
    });
  });

  it('validates password strength and matching', async () => {
    const passwordInput = screen.getByLabelText('Password', {
      selector: 'input',
    });
    const confirmPasswordInput = screen.getByLabelText('Confirm Password', {
      selector: 'input',
    });

    await userEvent.type(passwordInput, 'weak');
    await userEvent.type(confirmPasswordInput, 'different');

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Password must be at least 8 characters long/i)
      ).toBeVisible();
      expect(screen.getByText(/Passwords must match/i)).toBeVisible();
      expect(
        screen.getByText((content) => content.includes('Weak'))
      ).toBeInTheDocument();
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
        screen.queryByText(/Password must be at least 8 characters long/i)
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

  it('handles checkbox toggle', async () => {
    const checkbox = screen.getByRole('checkbox', { name: /Accept Terms/i });
    expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
