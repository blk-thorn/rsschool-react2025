import React, { useRef, useState } from 'react';
import { formSchema, type FormData } from '../utils/validation.ts';

interface Props {
  onSubmit: (data: FormData) => void;
}

export const UncontrolledForm: React.FC<Props> = ({ onSubmit }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (!formRef.current) return;

    const form: HTMLFormElement = formRef.current;
    const raw = new FormData(form);

    const data = {
      name: raw.get('name') as string,
      age: Number(raw.get('age')),
      email: raw.get('email') as string,
      password: raw.get('password') as string,
      confirmPassword: raw.get('confirmPassword') as string,
      gender: raw.get('gender') as string,
      accept: raw.get('accept') === 'on',
      country: raw.get('country') as string,
      picture: preview ?? '',
    };

    const result = formSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err): void => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    onSubmit(result.data);
    form.reset();
    setPreview(null);
    setErrors({});
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && ['image/png', 'image/jpeg'].includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = (): void => setPreview(reader.result as string);
      reader.readAsDataURL(file);
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.picture;
        return newErrors;
      });
    } else {
      setErrors((prev) => ({
        ...prev,
        picture: 'Only PNG or JPEG files are allowed',
      }));
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label>
        Name
        <input name="name" className="border" />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </label>
      <label>
        Age
        <input name="age" type="number" className="border" />
        {errors.age && <p className="text-red-500">{errors.age}</p>}
      </label>
      <label>
        Email
        <input name="email" type="email" className="border" />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </label>
      <label>
        Password
        <input name="password" type="password" className="border" />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
      </label>
      <label>
        Confirm Password
        <input name="confirmPassword" type="password" className="border" />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword}</p>
        )}
      </label>
      <fieldset>
        <legend>Gender</legend>
        <label>
          <input type="radio" name="gender" value="male" /> Male
        </label>
        <label>
          <input type="radio" name="gender" value="female" /> Female
        </label>
        {errors.gender && <p className="text-red-500">{errors.gender}</p>}
      </fieldset>
      <label>
        Country
        <input name="country" className="border" />
        {errors.country && <p className="text-red-500">{errors.country}</p>}
      </label>
      <label>
        <input type="checkbox" name="accept" /> Accept Terms
        {errors.accept && <p className="text-red-500">{errors.accept}</p>}
      </label>
      <label>
        Picture
        <input
          type="file"
          accept="image/png,image/jpeg"
          onChange={handleFile}
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-16 h-16 mt-2 grayscale-30 sepia-50 rounded-full"
          />
        )}
        {errors.picture && <p className="text-red-500">{errors.picture}</p>}
      </label>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Submit
      </button>
    </form>
  );
};
