import { ReactNode } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useCharacterStore } from '@/store/useCharacterStore.ts';
import { CardProps } from '@/types/types.ts';
import { useStatusColor } from '@/utils/useStatusColor.ts';
import { useTheme } from '@/context/ThemeContext.tsx';

export default function Card({ character }: CardProps): ReactNode {
  const { theme } = useTheme();
  const navigate: NavigateFunction = useNavigate();
  const { toggleItem, isItemSelected } = useCharacterStore();

  const statusColorClass = useStatusColor(character.status);

  const handleCardClick: () => void = (): void => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('details', character.id.toString());
    navigate(`?${searchParams.toString()}`);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.stopPropagation();
    toggleItem(character.id);
  };

  return (
    <div
      onClick={handleCardClick}
      data-testid="character-card"
      className={`flex items-center max-w-xl border rounded-lg shadow-sm overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer ${theme === 'dark' ? 'bg-slate-600/80 hover:bg-slate-700 border-gray-50' : 'bg-sky-800/80  border-slate-600'}`}
    >
      <div className="relative w-3/4 min-w-120px">
        <img
          className="w-full h-full object-cover min-h-58 rounded-lg min-w-33"
          src={character.image}
          alt={character.name}
        />
        <div className="absolute top-2 left-2">
          <input
            type="checkbox"
            checked={isItemSelected(character.id)}
            onChange={handleCheckboxChange}
            className="w-5 h-5 cursor-pointer"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 rounded-lg">
          <h3 className={`block font-bold text-lg rounded-md truncate  ${theme === 'dark' ? 'text-white bg-slate-500/90' : 'text-black bg-slate-100/90'}`}>
            {character.name}
          </h3>
        </div>
      </div>
      <ul className="flex flex-col text-left py-3 px-4 w-2/3">
        <li className="mb-1 flex flex-col">
          <span className={`block font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}> Status:</span>
          <span className={`mx-2 font-medium ${statusColorClass}`}>
            {character.status}
          </span>
        </li>
        <li className="mb-1 flex flex-col">
          <span className={`block font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Gender:</span>
          <span className={`block font-md text-lg mx-2 ${theme === 'dark' ? 'text-slate-300' : 'text-white'}`}>{character.gender}</span>
        </li>
        <li className="mb-1 flex flex-col">
          <span className={`block font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Species:</span>
          <span className={`block font-md text-lg mx-2 ${theme === 'dark' ? 'text-slate-300' : 'text-white'}`}>{character.species}</span>
        </li>
        <li className="mb-1 flex flex-col">
          <span className={`block font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Location:</span>
          <span className={`block font-md text-lg mx-2 ${theme === 'dark' ? 'text-slate-300' : 'text-white'}`}>
            {character.location.name}
          </span>
        </li>
      </ul>
    </div>
  );
}
