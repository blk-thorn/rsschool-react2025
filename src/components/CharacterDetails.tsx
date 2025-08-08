import { ReactElement, useEffect } from 'react';
import { useSearchParams, useNavigate, NavigateFunction } from 'react-router-dom';
import { ROUTES } from '@/app/routes.ts';
import Loader from '@/components/Loader.tsx';
import { useTheme } from '@/context/ThemeContext.tsx';
import { useCharacterQuery } from '@/hooks/useQueries.ts';
import { useCharacterStore } from '@/store/useCharacterStore.ts';
import { EmptyVoid } from '@/types/types.ts';
import { queryClient } from '@/utils/react-query.ts';
import { useStatusColor } from '@/utils/useStatusColor.ts';

export default function CharacterDetails(): ReactElement | null {
  const [searchParams] = useSearchParams();
  const navigate: NavigateFunction = useNavigate();
  const characterId: string | null = searchParams.get('details');
  const numCharacterId: number | undefined = characterId ? Number(characterId) : undefined;

  const { data: character, isLoading, isError, error } = useCharacterQuery(numCharacterId);
  const { toggleItem, isItemSelected } = useCharacterStore();
  const statusColorClass: string = useStatusColor(character?.status || '');
  const { theme } = useTheme();

  const handleClose: EmptyVoid = (): void => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('details');
    navigate(`?${newParams.toString()}`, { replace: true });
  };

  const handleCheckboxClick: EmptyVoid = (): void => {
    if (character) {
      toggleItem(character.id);
    }
  };

  useEffect((): void  => {
    const cached: unknown = queryClient.getQueryData(['characters', '', 1]);
    console.log('Сached data:', cached);
  }, []);

  if (!characterId) return null;
  if (isLoading) return <Loader />;
  if (isError) {
    console.error('Error fetching character:', error);
    navigate(ROUTES.NOT_FOUND, { replace: true });
    return null;
  }
  if (!character) return null;

  return (
    <div className="w-full mt-26">
      <div className={`border rounded-lg p-6 transition-all duration-100 ${theme === 'dark' ? 'bg-slate-700/80 hover:bg-slate-700 border-gray-50' : 'bg-slate-900/70  border-slate-400'}`}>
        <div className="flex justify-between items-start mb-4">
          <button
            onClick={handleClose}
            className={`text-xl cursor-pointer ${theme === 'dark' ? 'text-slate-300' : 'text-white'}`}
          >
            × Close
          </button>
          <input
            type="checkbox"
            checked={isItemSelected(character.id)}
            onChange={handleCheckboxClick}
            className="w-5 h-5 cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex justify-center">
            <img
              src={character.image}
              alt={character.name}
              className="rounded-lg w-64 h-64 object-cover"
            />
          </div>

          <div>
            <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{character.name}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Status:</h3>
                <p className={`${statusColorClass}`}>{character.status}</p>
              </div>

              <div>
                <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Species:</h3>
                <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-white'}`}>{character.species}</p>
              </div>

              <div>
                <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Gender:</h3>
                <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-white'}`}>{character.gender}</p>
              </div>

              <div>
                <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Origin:</h3>
                <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-white'}`}>{character.origin.name}</p>
              </div>

              <div className="md:col-span-2">
                <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Location:</h3>
                <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-white'}`}>{character.location.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
