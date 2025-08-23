import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type FormData, formSchema } from '../utils/validation';
import { countries } from '../constats/countries.ts';

interface Props {
  onSubmit: (data: FormData) => void;
}

export function ControlledForm({ onSubmit }: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'all',
  });

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const handlePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (): void => {
        const base64 = reader.result as string;
        setPreview(base64);
        setValue('picture', base64, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const submitForm = (data: FormData): void => {
    onSubmit(data);
  };

  const confirmPasswordError =
    confirmPassword && password && !password.startsWith(confirmPassword)
      ? 'Passwords do not match'
      : '';

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-lg w-full mx-auto"
    >
      <label className="flex flex-col">
        Name
        <input
          id="name"
          {...register('name')}
          className="border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </label>

      <label className="flex flex-col">
        Age
        <input
          id="age"
          type="number"
          {...register('age', { valueAsNumber: true })}
          className="border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.age && (
          <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
        )}
      </label>

      <label className="flex flex-col">
        Email
        <input
          id="email"
          type="email"
          {...register('email')}
          className="border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </label>

      <label className="flex flex-col">
        Password
        <input
          id="password"
          type="password"
          {...register('password')}
          className="border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </label>

      <label className="flex flex-col">
        Confirm Password
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          className="border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <p className="text-red-500 text-sm mt-1">
          {confirmPasswordError || errors.confirmPassword?.message}
        </p>
      </label>

      <fieldset className="flex flex-col gap-2">
        <legend className="font-medium">Gender</legend>
        <div className="flex gap-4">
          <label className="flex items-center gap-1">
            <input type="radio" value="male" {...register('gender')} />
            Male
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" value="female" {...register('gender')} />
            Female
          </label>
        </div>
        {errors.gender && (
          <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
        )}
      </fieldset>

      <label className="flex flex-col">
        Country
        <input
          id="country"
          list="countries"
          {...register('country')}
          className="border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          autoComplete="off"
        />
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        {errors.country && (
          <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
        )}
      </label>

      <label className="flex items-center gap-2">
        <input type="checkbox" {...register('accept')} />
        Accept Terms
      </label>
      {errors.accept && (
        <p className="text-red-500 text-sm">{errors.accept.message}</p>
      )}

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
          onChange={handlePictureChange}
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
          <p className="text-red-500 text-sm mt-1">{errors.picture.message}</p>
        )}
      </label>

      <button
        type="submit"
        disabled={!isValid}
        className={`px-4 py-2 rounded text-white font-semibold transition-colors duration-200 ${
          isValid
            ? 'bg-green-500 hover:bg-green-600'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Submit
      </button>
    </form>
  );
}
