import React, { useState } from 'react';
import { type FormData } from '../utils/validation';
import { countries } from '../constats/countries';
import {
  handleFileUpload,
  mapZodErrors,
  validateFormData,
} from '../utils/formUtils';
import { formDefaults } from '../utils/formDefaults.ts';

interface Props {
  onSubmit: (data: FormData) => void;
}

export const ControlledForm: React.FC<Props> = ({ onSubmit }: Props) => {
  const [formData, setFormData] = useState<FormData>(formDefaults);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, type, value, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    handleFileUpload(e, setPreview, setErrors);
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setFormData((prev) => ({
          ...prev,
          picture: reader.result as string,
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    const result = validateFormData({
      ...formData,
      picture: preview ?? '',
    });

    if (!result.success) {
      setErrors(mapZodErrors(result.error));
      return;
    }

    onSubmit(result.data);

    setFormData(formDefaults);
    setPreview(null);
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto"
    >
      <label className="flex flex-col">
        Name
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-sky-300"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name}</p>
        )}
      </label>

      <label className="flex flex-col">
        Age
        <input
          name="age"
          type="number"
          value={formData.age || ''}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-sky-300"
        />
        {errors.age && (
          <p className="text-red-500 text-sm">{errors.age}</p>
        )}
      </label>

      <label className="flex flex-col">
        Email
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-sky-300"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}
      </label>

      <label className="flex flex-col">
        Password
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-sky-300"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </label>

      <label className="flex flex-col">
        Confirm Password
        <input
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-sky-300"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}
      </label>

      <fieldset className="flex flex-col gap-2">
        <legend className="font-medium">Gender</legend>
        <div className="flex gap-4">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
            />
            Male
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
            />
            Female
          </label>
        </div>
        {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender}</p>
        )}
      </fieldset>

      <label className="flex flex-col">
        Country
        <input
          name="country"
          list="countries"
          value={formData.country}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-sky-300"
          autoComplete="off"
        />
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        {errors.country && (
          <p className="text-red-500 text-sm">{errors.country}</p>
        )}
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="accept"
          checked={formData.accept}
          onChange={handleChange}
        />
        Accept Terms
      </label>
      {errors.accept && <p className="text-red-500 text-sm">{errors.accept}</p>}

      <label className="flex flex-col">
        Picture
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => document.getElementById('controlledFile')?.click()}
            className="px-4 py-1 rounded text-white bg-sky-400 hover:bg-sky-500"
          >
            Choose File
          </button>
          <span className="text-gray-500 text-sm">
            {preview ? 'File selected' : 'Файл не выбран'}
          </span>
        </div>
        <input
          id="controlledFile"
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
          <p className="text-red-500 text-sm">{errors.picture}</p>
        )}
      </label>

      <button
        type="submit"
        className="px-4 py-2 rounded text-white font-semibold transition-colors duration-200 bg-green-400 hover:bg-green-500"
      >
        Submit
      </button>
    </form>
  );
};
