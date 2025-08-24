import { formSchema, type FormData } from './validation';
import type { ZodError, ZodIssue } from 'zod';

export const extractFormData = (
  raw: globalThis.FormData,
  preview: string | null
): FormData => ({
  name: raw.get('name') as string,
  age: Number(raw.get('age')),
  email: raw.get('email') as string,
  password: raw.get('password') as string,
  confirmPassword: raw.get('confirmPassword') as string,
  gender: raw.get('gender') as string,
  accept: raw.get('accept') === 'on',
  country: raw.get('country') as string,
  picture: preview ?? '',
});

export const mapZodErrors = (
  error: ZodError<FormData>
): Record<string, string> =>
  error.errors.reduce<Record<string, string>>((acc, err: ZodIssue) => {
    const field: string | number = err.path[0];
    if (typeof field === 'string') acc[field] = err.message;
    return acc;
  }, {});

export const validateFormData = (data: FormData) => formSchema.safeParse(data);

export const resetForm = (
  formRef: React.RefObject<HTMLFormElement | null>,
  setPreview: (v: string | null) => void,
  setErrors: (v: Record<string, string>) => void
): void => {
  formRef.current?.reset();
  setPreview(null);
  setErrors({});
};
