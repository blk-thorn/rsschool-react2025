import React, { type JSX } from 'react';

export const Spinner: React.FC = (): JSX.Element => (
  <div className="flex flex-col justify-center items-center w-screen h-screen bg-gray-100/10">
    <div className="w-20 h-20 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
    <span className="mt-4 text-gray-200 text-lg font-medium">Loading...</span>
  </div>
);
