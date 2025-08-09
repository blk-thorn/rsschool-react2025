import { useTheme } from '@/context/ThemeContext.tsx';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

export default function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  const { theme } = useTheme();

  return (
    <div
      id="toast-danger"
      className={`flex items-center w-[100%] min-w-[300px] p-4 ml-[3%] mb-8 rounded-lg shadow-sm relative z-10 ${
        theme === 'dark'
          ? 'text-gray-300 bg-gray-800 border border-gray-600'
          : 'text-gray-800 bg-white border border-gray-200'
      }`}
      role="alert"
    >
      <div
        className={`inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg ${
          theme === 'dark'
            ? 'text-red-300 bg-red-900/50'
            : 'text-red-500 bg-red-100'
        }`}
      >
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
        </svg>
      </div>
      <div className="ms-3 text-sm font-normal">{message}</div>
      <button
        onClick={onDismiss}
        type="button"
        className={`ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8 cursor-pointer ${
          theme === 'dark'
            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 focus:ring-gray-500 hover:text-white'
            : 'bg-white text-gray-400 hover:bg-gray-100 focus:ring-gray-300 hover:text-gray-900'
        }`}
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
}
