import { useTheme } from '@/context/ThemeContext';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="absolute top-4 right-4">
      <button
        onClick={toggleTheme}
        className="px-4 py-2 rounded-md bg-sky-600 text-white cursor-pointer"
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </div>
  );
}
