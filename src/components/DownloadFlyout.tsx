import { ReactElement, useRef } from 'react';
import { useCharacterStore } from '@/store/useCharacterStore.ts';
import { Character, DownloadFlyoutProps } from '@/types/types.ts';

export default function DownloadFlyout({ characters }: DownloadFlyoutProps): ReactElement | null {
  const { selectedItems, unselectAll } = useCharacterStore();
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

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

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-800 border border-slate-600 rounded-lg shadow-lg p-4 z-50">
        <div className="flex items-center justify-between gap-4">
          <div className="text-white">
            {selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'} selected
          </div>
          <div className="flex gap-2">
            <button
              onClick={unselectAll}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md transition-colors"
            >
              Unselect all
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-md transition-colors"
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </>
  )
};
