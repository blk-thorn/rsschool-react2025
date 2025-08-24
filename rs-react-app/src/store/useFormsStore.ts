import { create } from 'zustand';

export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  accept: boolean;
  country: string;
  picture?: string;
}

interface FormsState {
  uncontrolled: FormData[];
  controlled: FormData[];
  currentPicture: string | null;
  addUncontrolled: (data: FormData) => void;
  addControlled: (data: FormData) => void;
  setCurrentPicture: (base64: string | null) => void;
}

export const useFormsStore = create<FormsState>((set) => ({
  uncontrolled: [],
  controlled: [],
  currentPicture: null,
  addUncontrolled: (data) =>
    set((state) => ({ uncontrolled: [...state.uncontrolled, data] })),
  addControlled: (data) =>
    set((state) => ({ controlled: [...state.controlled, data] })),
  setCurrentPicture: (base64) => set({ currentPicture: base64 }),
}));
