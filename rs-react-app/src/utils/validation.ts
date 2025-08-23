import { z } from 'zod';

const passwordRegex = {
  number: /\d/,
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  special: /[_!@#$%^&*(),.?":{}|<>]/,
};

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .regex(/^[A-Z][a-zA-Z]*$/, 'Name must start with an uppercase letter'),
    age: z
      .number()
      .min(0, 'Age cannot be negative')
      .refine((val: number): boolean => val >= 0, 'Age cannot be negative'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .refine(
        (val: string): boolean => passwordRegex.number.test(val),
        'Must contain a number'
      )
      .refine(
        (val: string): boolean => passwordRegex.uppercase.test(val),
        'Must contain an uppercase letter'
      )
      .refine(
        (val: string): boolean => passwordRegex.lowercase.test(val),
        'Must contain a lowercase letter'
      )
      .refine(
        (val: string): boolean => passwordRegex.special.test(val),
        'Must contain a special character'
      ),
    confirmPassword: z.string(),
    gender: z.string().min(1, 'Gender is required'),
    accept: z.boolean().refine((val: boolean): boolean => val, {
      message: 'You must accept Terms & Conditions',
    }),
    country: z.string().min(1, 'Country is required'),
    picture: z.string().min(1, 'Picture is required'),
  })
  .refine((data): boolean => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type FormData = z.infer<typeof formSchema>;
