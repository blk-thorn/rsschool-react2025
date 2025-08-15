import { ReactElement, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useCharacterStore } from '@/store/useCharacterStore';
import { Character, DownloadFlyoutProps } from '@/types/types';

export default function DownloadFlyout({ characters }: DownloadFlyoutProps): ReactElement | null {
  const { selectedItems, unselectAll } = useCharacterStore();
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);
  const { theme } = useTheme();

  const handleDownload: () => void = (): void => {
    if (!downloadLinkRef.current) return;

    const headers: string[] = ['Name', 'Status', 'Species', 'Gender', 'Location', 'Details URL'];
    const rows: string[][] = characters
      .filter((char: Character): boolean => selectedItems.includes(char.id))
      .map((char: Character): string[] => [
        `"${char.name}"`,
        `"${char.status}"`,
        `"${char.species}"`,
        `"${char.gender}"`,
        `"${char.location.name}"`,
        `"${window.location.origin}/?details=${char.id}"`
      ]);

    const csvContent: string = [headers.join(','), ...rows.map((row: string[]): string => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url: string = URL.createObjectURL(blob);

    downloadLinkRef.current.href = url;
    downloadLinkRef.current.download = `${selectedItems.length}_items.csv`;
    downloadLinkRef.current.click();

    setTimeout((): void => URL.revokeObjectURL(url), 100);
  };

  if (selectedItems.length === 0) return null;

  return (
    <>
      <a
        ref={downloadLinkRef}
        className="hidden"
        aria-hidden="true"
      />

      <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 border rounded-lg shadow-lg p-4 z-50 ${theme === 'dark' ? 'bg-slate-800 border-slate-400' : 'bg-slate-500  border-slate-600'}`}>
        <div className="flex items-center justify-between gap-4">
          <div className={`${theme === 'dark' ? 'text-slate-300' : 'text-white'}`}>
            {selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'} selected
          </div>
          <div className="flex gap-2">
            <button
              onClick={unselectAll}
              className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${theme === 'dark' ? 'bg-slate-600 hover:bg-slate-700 text-slate-300' : 'bg-sky-700 hover:bg-sky-800 text-white'}`}
            >
              Unselect all
            </button>
            <button
              onClick={handleDownload}
              className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${theme === 'dark' ? 'bg-slate-600 hover:bg-slate-700 text-slate-300' : 'bg-sky-700 hover:bg-sky-800 text-white'}`}
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </>
  )
};
