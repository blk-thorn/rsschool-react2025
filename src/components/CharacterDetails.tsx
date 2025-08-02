import { ReactElement, useEffect, useState } from 'react';
import { useSearchParams, useNavigate, NavigateFunction } from 'react-router-dom';
import { ROUTES } from '@/app/routes.ts';
import Loader from '@/components/Loader.tsx';
import { useCharacterStore } from '@/store/useCharacterStore.ts';
import { Character, EmptyVoid } from '@/types/types.ts';
import { fetchCharacter } from '@/utils/api.ts';
import { useStatusColor } from '@/utils/useStatusColor.ts';

export default function CharacterDetails(): ReactElement | null {
  const [searchParams] = useSearchParams();
  const navigate: NavigateFunction = useNavigate();
  const characterId: string | null = searchParams.get('details');

  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { toggleItem, isItemSelected } = useCharacterStore();

  const statusColorClass: string = useStatusColor(character?.status || '');

  useEffect((): void => {
    if (!characterId) return;

    const loadCharacter: EmptyVoid = async (): Promise<void> => {
      setIsLoading(true);
      setError(null);
      try {
        const data: Character = await fetchCharacter(Number(characterId));
        setCharacter(data);
      } catch (err) {
        console.error('Error fetching character:', err);
        setError(err instanceof Error ? err.message : 'Failed to load character');
        navigate(ROUTES.NOT_FOUND, { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    loadCharacter();
  }, [characterId, navigate]);

  const handleClose: EmptyVoid = (): void => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('details');
    navigate(`?${newParams.toString()}`, { replace: true });
  };

  const handleCheckboxClick: () => void = (): void => {
    if (character) {
      toggleItem(character.id);
    }
  };

  if (!characterId) return null;
  if (isLoading) return <Loader />;
  if (error) return null;
  if (!character) return null;

  return (
    <div className="w-full mt-27">
      <div className="bg-slate-800 rounded-lg p-6">
        <div className="flex justify-between items-start mb-4">
          <button
            onClick={handleClose}
            className="text-white hover:text-red-500 text-xl cursor-pointer"
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
            <h2 className="text-2xl font-bold text-white mb-4">{character.name}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-white font-medium">Status:</h3>
                <p className={`${statusColorClass}`}>{character.status}</p>
              </div>

              <div>
                <h3 className="text-white font-medium">Species:</h3>
                <p className="text-slate-300">{character.species}</p>
              </div>

              <div>
                <h3 className="text-white font-medium">Gender:</h3>
                <p className="text-slate-300">{character.gender}</p>
              </div>

              <div>
                <h3 className="text-white font-medium">Origin:</h3>
                <p className="text-slate-300">{character.origin.name}</p>
              </div>

              <div className="md:col-span-2">
                <h3 className="text-white font-medium">Location:</h3>
                <p className="text-slate-300">{character.location.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
