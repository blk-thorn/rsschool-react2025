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
    age: z.number().min(0, 'Age cannot be negative'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string(),
    gender: z.string().min(1, 'Gender is required'),
    accept: z.boolean().refine((val: boolean): boolean => val, {
      message: 'You must accept Terms & Conditions',
    }),
    country: z.string().min(1, 'Country is required'),
    picture: z.string().min(1, 'Picture is required'),
  })
  .superRefine((data, ctx) => {
    const errors: string[] = [];
    if (!passwordRegex.special.test(data.password))
      errors.push('Must contain a special character');
    if (!passwordRegex.number.test(data.password))
      errors.push('Must contain a number');
    if (!passwordRegex.uppercase.test(data.password))
      errors.push('Must contain an uppercase letter');
    if (!passwordRegex.lowercase.test(data.password))
      errors.push('Must contain a lowercase letter');
    if (data.password.length < 8)
      errors.push('Password must be at least 8 characters long');

    if (errors.length > 0) {
      errors.forEach((err) =>
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: err,
          path: ['password'],
        })
      );
    }

    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords must match',
        path: ['confirmPassword'],
      });
    }
  });

export type FormData = z.infer<typeof formSchema>;
