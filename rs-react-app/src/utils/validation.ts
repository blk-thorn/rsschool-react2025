import { z } from 'zod';

const passwordRegex = {
  number: /\d/,
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  special: /[!@#$%^&*(),.?":{}|<>]/,
};

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .regex(/^[A-Z][a-zA-Z]*$/, 'Name must start with an uppercase letter'),
    age: z
      .string()
      .refine(
        (val: string): boolean => !isNaN(Number(val)),
        'Age must be a number'
      )
      .transform((val: string): number => Number(val))
      .refine((num: number): boolean => num >= 0, 'Age cannot be negative'),
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
    acceptTerms: z.literal(true, {
      errorMap: (): { message: string } => ({
        message: 'You must accept Terms & Conditions',
      }),
    }),
    country: z.string().min(1, 'Country is required'),
    picture: z
      .instanceof(File, { message: 'Picture is required' })
      .refine(
        (file: File): boolean =>
          ['image/png', 'image/jpeg'].includes(file.type),
        'Only PNG or JPEG files are allowed'
      )
      .refine(
        (file: File): boolean => file.size <= 2 * 1024 * 1024,
        'File size must be less than 2MB'
      ),
  })
  .refine((data): boolean => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type FormData = z.infer<typeof formSchema>;
