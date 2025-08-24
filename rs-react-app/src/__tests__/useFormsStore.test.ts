import { describe, it, expect, beforeEach } from 'vitest';
import { useFormsStore } from '../store/useFormsStore';
import { type FormData } from '../utils/validation';

describe('Forms Store', () => {
  beforeEach(() => {
    useFormsStore.setState({
      uncontrolled: [],
      controlled: [],
    });
  });

  it('should add data for both uncontrolled and controlled forms', () => {
    const uncontrolled: FormData = {
      name: 'Uncontrolled',
      age: 20,
      email: 'uncontrolled@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      gender: 'male',
      accept: true,
      country: 'UK',
      picture: 'uncontrolled.jpg',
    };

    const controlled: FormData = {
      name: 'Controlled',
      age: 25,
      email: 'controlled@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      gender: 'female',
      accept: true,
      country: 'France',
      picture: 'controlled.jpg',
    };

    useFormsStore.getState().addUncontrolled(uncontrolled);
    useFormsStore.getState().addControlled(controlled);

    const state = useFormsStore.getState();

    expect(state.uncontrolled).toHaveLength(1);
    expect(state.controlled).toHaveLength(1);
    expect(state.uncontrolled[0]).toEqual(uncontrolled);
    expect(state.controlled[0]).toEqual(controlled);
  });

  it('should keep uncontrolled and controlled arrays independent', () => {
    const uncontrolled: FormData = {
      name: 'OnlyUncontrolled',
      age: 22,
      email: 'only@uncontrolled.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      gender: 'male',
      accept: true,
      country: 'Germany',
      picture: 'only-uncontrolled.jpg',
    };

    useFormsStore.getState().addUncontrolled(uncontrolled);

    const state = useFormsStore.getState();

    expect(state.uncontrolled).toHaveLength(1);
    expect(state.controlled).toHaveLength(0);
  });
});
