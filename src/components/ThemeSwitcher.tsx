import { useTheme } from '@/context/ThemeContext';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="absolute top-4 right-4">
      <button
        onClick={toggleTheme}
        className={`inline-flex items-center px-4 py-2 rounded-md ms-2 text-sm font-medium rounded-lg cursor-pointer transition-all duration-100 ${theme === 'dark' ? 'bg-slate-600 hover:bg-slate-700 border-gray-50 text-slate-300' : 'bg-sky-600  hover:bg-sky-700  focus:ring-sky-600 text-white'}`}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </div>
  );
}
