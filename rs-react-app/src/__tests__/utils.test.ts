import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleFileUpload } from '../utils/handleFileUpload';
import { convertFileToBase64 } from '../utils/fileUtils';
import { MAX_IMAGE_SIZE } from '../constats/general.ts';

vi.mock('../utils/fileUtils', () => ({
  convertFileToBase64: vi.fn(),
}));

describe('handleFileUpload', () => {
  const setPreview = vi.fn();
  const setErrors = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should convert valid image file to base64 and clear picture error', async () => {
    const mockedConvert = vi.mocked(convertFileToBase64);
    mockedConvert.mockResolvedValue('data:image/png;base64,dummy');

    const file = new File(['dummy'], 'test.png', { type: 'image/png' });
    const event = {
      target: { files: [file] },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    await handleFileUpload(event, setPreview, setErrors);

    expect(mockedConvert).toHaveBeenCalledWith(file);
    expect(setPreview).toHaveBeenCalledWith('data:image/png;base64,dummy');

    const callback = setErrors.mock.calls[0][0];
    expect(callback({ picture: 'error' })).toEqual({});
  });

  it('should set error for invalid file type', async () => {
    const file = new File(['dummy'], 'test.txt', { type: 'text/plain' });
    const event = {
      target: { files: [file] },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    await handleFileUpload(event, setPreview, setErrors);

    expect(setPreview).toHaveBeenCalledWith(null);
    const callback = setErrors.mock.calls[0][0];
    expect(callback({})).toEqual({
      picture: 'Only PNG or JPEG files are allowed',
    });
  });

  it('should set error for file too large', async () => {
    const file = new File(['dummy'], 'big.png', { type: 'image/png' });
    Object.defineProperty(file, 'size', { value: MAX_IMAGE_SIZE + 1 });

    const event = {
      target: { files: [file] },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    await handleFileUpload(event, setPreview, setErrors);

    expect(setPreview).toHaveBeenCalledWith(null);
    const callback = setErrors.mock.calls[0][0];
    expect(callback({})).toEqual({
      picture: 'File size must be less than 2 MB',
    });
  });

  it('should set error if convertFileToBase64 throws', async () => {
    const mockedConvert = vi.mocked(convertFileToBase64);
    mockedConvert.mockRejectedValue(new Error('fail'));

    const file = new File(['dummy'], 'test.png', { type: 'image/png' });
    const event = {
      target: { files: [file] },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    await handleFileUpload(event, setPreview, setErrors);

    expect(setPreview).toHaveBeenCalledWith(null);
    const callback = setErrors.mock.calls[0][0];
    expect(callback({})).toEqual({ picture: 'Failed to read file' });
  });
});
