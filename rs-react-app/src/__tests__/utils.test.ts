import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  handleFileUpload,
  extractFormData,
  mapZodErrors,
  validateFormData,
  resetForm,
} from '../utils/formUtils';
import { type FormData, formSchema } from '../utils/validation';

describe('Utility Functions', () => {
  describe('handleFileUpload', () => {
    beforeEach(() => {
      vi.restoreAllMocks();
    });

    it('should convert valid image file to base64 and clear picture error', () => {
      const file = new File(['dummy'], 'test.png', { type: 'image/png' });
      const event = {
        target: { files: [file] },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      const setPreview = vi.fn();
      const setErrors = vi.fn((cb) => cb({ picture: 'error' }));

      vi.stubGlobal(
        'FileReader',
        class {
          onloadend: () => void = () => {};
          readAsDataURL() {
            this.onloadend?.();
          }
          result = 'data:image/png;base64,dummy';
        }
      );

      handleFileUpload(event, setPreview, setErrors);

      expect(setPreview).toHaveBeenCalledWith('data:image/png;base64,dummy');
      expect(setErrors).toHaveBeenCalled();
      const callback = setErrors.mock.calls[0][0];
      expect(callback({ picture: 'error' })).toEqual({});
    });

    it('should set error for invalid file type', () => {
      const file = new File(['dummy'], 'test.txt', { type: 'text/plain' });
      const event = {
        target: { files: [file] },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      const setPreview = vi.fn();
      const setErrors = vi.fn();

      handleFileUpload(event, setPreview, setErrors);

      expect(setPreview).not.toHaveBeenCalled();
      expect(setErrors).toHaveBeenCalled();
      const callback = setErrors.mock.calls[0][0];
      expect(callback({})).toEqual({
        picture: 'Only PNG or JPEG files are allowed',
      });
    });
  });

  describe('extractFormData', () => {
    it('should map FormData to object correctly', () => {
      const raw = new FormData();
      raw.set('name', 'John Doe');
      raw.set('age', '30');
      raw.set('email', 'john@example.com');
      raw.set('password', 'Abcd1234');
      raw.set('confirmPassword', 'Abcd1234');
      raw.set('gender', 'male');
      raw.set('accept', 'on');
      raw.set('country', 'USA');

      const result = extractFormData(raw, 'preview.png');

      expect(result).toEqual({
        name: 'John Doe',
        age: 30,
        email: 'john@example.com',
        password: 'Abcd1234',
        confirmPassword: 'Abcd1234',
        gender: 'male',
        accept: true,
        country: 'USA',
        picture: 'preview.png',
      });
    });
  });

  describe('mapZodErrors', () => {
    it('should map zod errors to object', () => {
      const invalidData: FormData = {
        name: '',
        age: 0,
        email: 'invalid-email',
        password: '123',
        confirmPassword: '456',
        gender: '',
        accept: false,
        country: '',
        picture: '',
      };

      const parsed = formSchema.safeParse(invalidData);
      if (!parsed.success) {
        const errors = mapZodErrors(parsed.error);
        expect(errors).toHaveProperty('email');
        expect(errors).toHaveProperty('password');
      }
    });
  });

  describe('validateFormData', () => {
    it('should succeed for valid data', () => {
      const validData: FormData = {
        name: 'John',
        age: 30,
        email: 'john.doe@example.com',
        password: 'Abcd1234!',
        confirmPassword: 'Abcd1234!',
        gender: 'male',
        accept: true,
        country: 'USA',
        picture: 'preview.png',
      };

      const result = validateFormData(validData);

      if (!result.success) {
        console.log(result.error.format());
      }

      expect(result.success).toBe(true);
    });

    it('should fail for invalid data', () => {
      const invalidData: FormData = {
        name: '',
        age: 0,
        email: 'invalid-email',
        password: '123',
        confirmPassword: '456',
        gender: '',
        accept: false,
        country: '',
        picture: '',
      };

      const result = validateFormData(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('resetForm', () => {
    it('should reset form, preview, and errors', () => {
      const formRef = {
        current: { reset: vi.fn() },
      } as unknown as React.RefObject<HTMLFormElement>;
      const setPreview = vi.fn();
      const setErrors = vi.fn();

      resetForm(formRef, setPreview, setErrors);

      expect(formRef.current?.reset).toHaveBeenCalled();
      expect(setPreview).toHaveBeenCalledWith(null);
      expect(setErrors).toHaveBeenCalledWith({});
    });
  });
});
