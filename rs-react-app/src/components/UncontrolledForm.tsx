import React, { useRef, useState } from 'react';
import { countries } from '../constats/countries';
import {
  extractFormData,
  mapZodErrors,
  validateFormData,
  resetForm,
} from '../utils/formUtils';
import { type FormData } from '../utils/validation';
import { useActionState } from 'react';
import { handleFileUpload } from '../utils/handleFileUpload.ts';
import { checkPasswordStrength } from '../utils/checkPasswordStrength.ts';

interface Props {
  onSubmit: (data: FormData) => void;
  onClose: () => void;
}

export const UncontrolledForm: React.FC<Props> = ({ onSubmit, onClose }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<string | null>(null);

  const [errors, formAction, pending] = useActionState(async () => {
    if (!formRef.current) return {};

    const raw = new FormData(formRef.current);
    const data = extractFormData(raw, preview);

    if (data.password) {
      setPasswordStrength(checkPasswordStrength(data.password));
    }

    const result = validateFormData(data);

    if (!result.success) {
      return mapZodErrors(result.error);
    }

    onSubmit(result.data);
    onClose();
    resetForm(formRef, setPreview, () => {});
    return {};
  }, {});

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col gap-2 bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto"
    >
      <label className="flex flex-col">
        Name
        <input
          name="name"
          className="border border-gray-300 rounded px-3 py-1"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </label>
      <label className="flex flex-col">
        Age
        <input
          name="age"
          type="number"
          className="border border-gray-300 rounded px-3 py-1"
        />
        {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
      </label>
      <label className="flex flex-col">
        Email
        <input
          name="email"
          type="email"
          className="border border-gray-300 rounded px-3 py-1"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </label>
      <label className="flex flex-col">
        Password
        <input
          name="password"
          type="password"
          className="border border-gray-300 rounded px-3 py-1"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </label>
      {passwordStrength && (
        <p className="text-sm mt-1">
          Password strength:{' '}
          <span
            className={
              passwordStrength === 'Weak'
                ? 'text-red-500'
                : passwordStrength === 'Medium'
                  ? 'text-yellow-500'
                  : 'text-green-500'
            }
          >
            {passwordStrength}
          </span>
        </p>
      )}
      <label className="flex flex-col">
        Confirm Password
        <input
          name="confirmPassword"
          type="password"
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
            <input type="radio" name="gender" value="male" /> Male
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" name="gender" value="female" /> Female
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
        <input type="checkbox" name="accept" /> Accept Terms
      </label>
      {errors.accept && <p className="text-red-500 text-sm">{errors.accept}</p>}
      <label className="flex flex-col">
        Picture
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => document.getElementById('fileInput')?.click()}
            className="px-4 py-1 rounded text-white bg-sky-400 hover:bg-sky-500"
          >
            Choose File
          </button>
          <span className="text-gray-500 text-sm">
            {preview ? 'File selected' : 'Файл не выбран'}
          </span>
        </div>
        <input
          id="fileInput"
          data-testid="fileInput"
          type="file"
          accept="image/png,image/jpeg"
          onChange={(e) => handleFileUpload(e, setPreview, () => {})}
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
        disabled={pending}
        className="px-4 py-2 rounded text-white font-semibold transition-colors duration-200 bg-green-400 hover:bg-green-500 disabled:opacity-50"
      >
        {pending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};
