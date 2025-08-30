import React, { type JSX } from 'react';

type Props = {
  available: string[];
  selected: string[];
  onChange: (cols: string[]) => void;
  onClose: () => void;
};

export const Modal: React.FC<Props> = ({
  available,
  selected,
  onChange,
  onClose,
}: Props): JSX.Element => {
  const toggle: (col: string) => void = (col: string): void => {
    if (selected.includes(col)) {
      onChange(selected.filter((c: string): boolean => c !== col));
    } else {
      onChange([...selected, col]);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-800 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-96">
        <h2 className="text-lg font-bold mb-4 text-slate-700">
          Select Additional Columns
        </h2>
        <div className="space-y-2">
          {available.map(
            (col: string): JSX.Element => (
              <label
                key={col}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(col)}
                  onChange={(): void => toggle(col)}
                  className="form-checkbox cursor-pointer"
                />
                <span className="text-slate-700">
                  {col.replaceAll('_', ' ')}
                </span>
              </label>
            )
          )}
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-slate-700 text-slate-100 hover:bg-slate-600 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
