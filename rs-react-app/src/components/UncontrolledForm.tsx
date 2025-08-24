import React, { useRef, useState } from 'react';
import { formSchema, type FormData } from '../utils/validation.ts';
import { countries } from '../constats/countries.ts';

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
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto"
    >
      <label className="flex flex-col">
        Name
        <input
          name="name"
          className="border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </label>

      <label className="flex flex-col">
        Age
        <input
          name="age"
          type="number"
          className="border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.age && (
          <p className="text-red-500 text-sm mt-1">{errors.age}</p>
        )}
      </label>

      <label className="flex flex-col">
        Email
        <input
          name="email"
          type="email"
          className="border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </label>

      <label className="flex flex-col">
        Password
        <input
          name="password"
          type="password"
          className="border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </label>

      <label className="flex flex-col">
        Confirm Password
        <input
          name="confirmPassword"
          type="password"
          className="border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
        )}
      </label>

      <fieldset className="flex flex-col gap-2">
        <legend className="font-medium">Gender</legend>
        <div className="flex gap-4">
          <label className="flex items-center gap-1">
            <input type="radio" name="gender" value="male" />
            Male
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" name="gender" value="female" />
            Female
          </label>
        </div>
        {errors.gender && (
          <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
        )}
      </fieldset>

      <label className="flex flex-col">
        Country
        <input
          name="country"
          list="countries"
          className="border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          autoComplete="off"
        />
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        {errors.country && (
          <p className="text-red-500 text-sm mt-1">{errors.country}</p>
        )}
      </label>

      <label className="flex items-center gap-2">
        <input type="checkbox" name="accept" />
        Accept Terms
      </label>
      {errors.accept && <p className="text-red-500 text-sm">{errors.accept}</p>}

      <label className="flex flex-col">
        Picture
        <div className="flex items-center gap-4 mt-1">
          <button
            type="button"
            onClick={() => document.getElementById('fileInput')?.click()}
            className="px-4 py-2 rounded text-white bg-sky-500"
          >
            Choose File
          </button>
          <span className="text-gray-500 text-sm">
            {preview ? 'File selected' : 'Файл не выбран'}
          </span>
        </div>
        <input
          id="fileInput"
          type="file"
          accept="image/png,image/jpeg"
          onChange={handleFile}
          className="hidden"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-16 h-16 mt-2 rounded-full shadow-md object-cover"
          />
        )}
        {errors.picture && (
          <p className="text-red-500 text-sm mt-1">{errors.picture}</p>
        )}
      </label>

      <button
        type="submit"
        className="px-4 py-2 rounded text-white font-semibold transition-colors duration-200 bg-green-500 hover:bg-green-600"
      >
        Submit
      </button>
    </form>
  );
};
