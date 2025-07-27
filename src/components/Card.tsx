import { ReactNode } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { CardProps, EmptyVoid} from '@/types/types.ts';
import { getStatusColor } from '@/utils/getStatusColor.ts';

export default function Card({ character }: CardProps): ReactNode {
  const navigate: NavigateFunction = useNavigate();

  const statusColorClass: string = getStatusColor(character.status);

  const handleClick: EmptyVoid = (): void => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('details', character.id.toString());
    navigate(`?${searchParams.toString()}`);
  };

  return (
    <div
      onClick={handleClick}
      data-testid="character-card"
      className="flex items-center max-w-xl bg-slate-600 border border-slate-200 rounded-lg shadow-sm dark:border-slate-600 overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer">
      <div className="relative w-3/4 min-w-120px">
        <img
          className="w-full h-full object-cover min-h-58 rounded-lg min-w-33"
          src={character.image}
          alt="Tiny Rick"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 rounded-lg">
          <h3 className="text-white text-md font-bold truncate">
            {character.name}
          </h3>
        </div>
      </div>
      <ul className="flex flex-col text-left py-3 px-4 w-2/3">
        <li className="mb-1 flex flex-col">
          <span className="block text-white font-medium">Status:</span>
          <span className={`mx-2 font-medium ${statusColorClass}`}>
              {character.status}
            </span>
        </li>
        <li className="mb-1 flex flex-col">
          <span className="block text-white font-medium">Gender:</span>
          <span className="text-slate-300 mx-2">{character.gender}</span>
        </li>
        <li className="mb-1 flex flex-col">
          <span className="block text-white font-medium">Species:</span>
          <span className="text-slate-300 mx-2">{character.species}</span>
        </li>
        <li className="mb-1 flex flex-col">
          <span className="block text-white font-medium">Location:</span>
          <span className="text-slate-300 mx-2">
              {character.location.name}
            </span>
        </li>
      </ul>
    </div>
  );
}
