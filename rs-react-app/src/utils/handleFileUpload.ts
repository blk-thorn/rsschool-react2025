import { MAX_IMAGE_SIZE } from '../constats/general.ts';
import { convertFileToBase64 } from '../utils/fileUtils';

export const handleFileUpload = async (
  e: React.ChangeEvent<HTMLInputElement>,
  setPreview: (value: string | null) => void,
  setErrors: (
    cb: (prev: Record<string, string>) => Record<string, string>
  ) => void
): Promise<void> => {
  const file = e.target.files?.[0];
  if (!file) return;

  if (!['image/png', 'image/jpeg'].includes(file.type)) {
    setErrors((prev) => ({
      ...prev,
      picture: 'Only PNG or JPEG files are allowed',
    }));
    setPreview(null);
    return;
  }

  if (file.size > MAX_IMAGE_SIZE) {
    setErrors((prev) => ({
      ...prev,
      picture: 'File size must be less than 2 MB',
    }));
    setPreview(null);
    return;
  }

  try {
    const base64 = await convertFileToBase64(file);
    setPreview(base64);

    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.picture;
      return copy;
    });
  } catch {
    setErrors((prev) => ({
      ...prev,
      picture: 'Failed to read file',
    }));
    setPreview(null);
  }
};
