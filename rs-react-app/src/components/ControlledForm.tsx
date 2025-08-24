import React, { useState } from 'react';
import { type FormData } from '../utils/validation';
import { countries } from '../constats/countries';
import {
  handleFileUpload,
  mapZodErrors,
  validateFormData,
} from '../utils/formUtils';
import { formDefaults } from '../utils/formDefaults.ts';
import { useActionState } from 'react';

interface Props {
  onSubmit: (data: FormData) => void;
  onClose: () => void;
}

export const ControlledForm: React.FC<Props> = ({
  onSubmit,
  onClose,
}: Props) => {
  const [formData, setFormData] = useState<FormData>(formDefaults);
  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const [, formAction, pending] = useActionState(
    async (_prevErrors: Record<string, string>, formData: FormData) => {
      const result = validateFormData({
        ...formData,
        picture: preview ?? '',
      });

      if (!result.success) {
        const fieldErrors: Record<string, string> = mapZodErrors(result.error);
        setErrors(fieldErrors);
        return fieldErrors;
      }

      onSubmit(result.data);
      onClose();

      setFormData(formDefaults);
      setPreview(null);
      setErrors({});

      return {};
    },
    {}
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, type, value, checked } = e.target as HTMLInputElement;

    let newValue: string | number | boolean = value;
    if (type === 'checkbox') {
      newValue = checked;
    } else if (type === 'number') {
      newValue = value === '' ? '' : Number(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    const fieldResult = validateFormData({
      ...formData,
      [name]: newValue,
      picture: preview ?? '',
    });

    if (!fieldResult.success) {
      const fieldErrors = mapZodErrors(fieldResult.error);
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    handleFileUpload(e, setPreview, () => {});
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileData = reader.result as string;
        setPreview(fileData);
        setFormData((prev) => ({
          ...prev,
          picture: fileData,
        }));

        setErrors((prev) => ({ ...prev, picture: undefined }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <form
      onSubmit={(e): void => {
        e.preventDefault();
        formAction(formData);
      }}
      className="flex flex-col gap-2 bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto"
    >
      <label className="flex flex-col">
        Name
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-1"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </label>

      <label className="flex flex-col">
        Age
        <input
          name="age"
          type="number"
          value={formData.age || ''}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-1"
        />
        {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
      </label>

      <label className="flex flex-col">
        Email
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-1"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </label>

      <label className="flex flex-col">
        Password
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-1"
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
          className="border border-gray-300 rounded px-3 py-1"
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
          className="border border-gray-300 rounded px-3 py-1"
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
        {errors.picture && (
          <p className="text-red-500 text-sm">{errors.picture}</p>
        )}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-16 h-16 mt-2 rounded-full shadow-md object-cover"
          />
        )}
      </label>

      <button
        type="submit"
        disabled={pending}
        className="px-4 py-2 rounded text-white font-semibold transition-colors duration-200 bg-green-400 hover:bg-green-500 disabled:opacity-50"
      >
        {pending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};
