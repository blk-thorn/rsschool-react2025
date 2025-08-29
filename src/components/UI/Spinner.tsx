import React, { type JSX } from 'react';

export const Spinner: React.FC = (): JSX.Element => (
  <div className="flex justify-center items-center p-6">
    <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
);
