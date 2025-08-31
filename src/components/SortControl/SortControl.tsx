import React, { useState, useEffect, useCallback, memo } from 'react';

export type SortKind = 'name-asc' | 'name-desc' | 'pop-asc' | 'pop-desc';

interface SortControlProps {
  initialSort?: SortKind;
  onSortChange: (sort: SortKind) => void;
}

const SortControlComponent: React.FC<SortControlProps> = ({
  initialSort = 'name-asc',
  onSortChange,
}) => {
  const [internalSort, setInternalSort] = useState<SortKind>(initialSort);

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>): void => {
      setInternalSort(e.target.value as SortKind);
    },
    []
  );

  useEffect((): void => {
    onSortChange(internalSort);
  }, [internalSort, onSortChange]);

  return (
    <div className="flex items-center gap-2">
      <label className="text-slate-800 font-semibold">Sort:</label>
      <select
        value={internalSort}
        onChange={handleSortChange}
        className="px-2 py-1 rounded border border-slate-600 bg-white text-slate-800"
      >
        <option value="name-asc">Name ↑</option>
        <option value="name-desc">Name ↓</option>
        <option value="pop-asc">Population ↑</option>
        <option value="pop-desc">Population ↓</option>
      </select>
    </div>
  );
};

export const SortControl = memo(SortControlComponent);
