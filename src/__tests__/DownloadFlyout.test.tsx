import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';
import { mockCharacters } from '@/__tests__/__mocks__/mockData.ts';
import DownloadFlyout from '@/components/DownloadFlyout.tsx';
import { useTheme } from '@/context/ThemeContext.tsx';
import { useCharacterStore } from '@/store/useCharacterStore';

vi.mock('@/store/useCharacterStore');
vi.mock('@/context/ThemeContext');

describe('DownloadFlyout', (): void => {
  const mockUnselectAll: Mock = vi.fn();
  const mockCreateObjectURL: Mock = vi.fn((): string => 'mock-url');
  const mockRevokeObjectURL: Mock = vi.fn();

  beforeEach((): void => {
    vi.clearAllMocks();

    global.URL.createObjectURL = mockCreateObjectURL;
    global.URL.revokeObjectURL = mockRevokeObjectURL;

    global.window.open = vi.fn();

    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn(),
    });

    vi.mocked(useCharacterStore).mockReturnValue({
      selectedItems: [mockCharacters[0].id],
      unselectAll: mockUnselectAll,
    });
  });

  it('should not render when no items are selected', (): void => {
    vi.mocked(useCharacterStore).mockReturnValue({
      selectedItems: [],
      unselectAll: mockUnselectAll,
    });

    const { container } = render(<DownloadFlyout characters={mockCharacters} />);
    expect(container.firstChild).toBeNull();
  });

  it('should display the count of selected items', (): void => {
    render(<DownloadFlyout characters={mockCharacters} />);
    expect(screen.getByText('1 item selected')).toBeInTheDocument();
  });

  it('should call unselectAll when button is clicked', (): void => {
    render(<DownloadFlyout characters={mockCharacters} />);
    fireEvent.click(screen.getByText('Unselect all'));
    expect(mockUnselectAll).toHaveBeenCalledOnce();
  });

  it('should generate CSV and trigger download', async () => {
    const { container } = render(<DownloadFlyout characters={mockCharacters} />);
    const link: HTMLAnchorElement | null = container.querySelector('a');

    if (!(link instanceof HTMLAnchorElement)) {
      throw new Error('Link element not found');
    }

    link.click = vi.fn();

    fireEvent.click(screen.getByText('Download'));

    expect(link.download).toBe('1_items.csv');
    expect(link.href).toContain('mock-url');

    expect(link.click).toHaveBeenCalledOnce();
    expect(mockCreateObjectURL).toHaveBeenCalled();

    await vi.waitFor(() => {
      expect(mockRevokeObjectURL).toHaveBeenCalledWith('mock-url');
    });
  });
});
