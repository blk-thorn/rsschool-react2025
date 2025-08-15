'use client';

import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { ReactElement, useEffect } from 'react';
import Loader from '@/components/Loader';
import { ROUTES } from '@/constants/routes';
import { useTheme } from '@/context/ThemeContext';
import { useCharacterQuery } from '@/hooks/useQueries';
import { useCharacterStore } from '@/store/useCharacterStore';
import { EmptyVoid } from '@/types/types';
import { queryClient } from '@/utils/queryClient';
import { useStatusColor } from '@/utils/useStatusColor';

export default function CharacterDetails(): ReactElement | null {
  const searchParams = useSearchParams();
  const router = useRouter();
  const characterId = searchParams.get('details');
  const numCharacterId = characterId ? Number(characterId) : undefined;

  const { data: character, isLoading, isError, error } = useCharacterQuery(numCharacterId);
  const { toggleItem, isItemSelected } = useCharacterStore();
  const statusColorClass = useStatusColor(character?.status || '');
  const { theme } = useTheme();

  const handleClose: EmptyVoid = (): void => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete('details');
    router.replace(`?${newParams.toString()}`);
  };

  const handleCheckboxClick: EmptyVoid = (): void => {
    if (character) {
      toggleItem(character.id);
    }
  };

  useEffect(() => {
    const characterCache = queryClient.getQueryData(['character', numCharacterId]);
    console.log('Character cache:', characterCache);
  }, [numCharacterId]);

  if (!characterId) return null;
  if (isLoading) return <Loader />;
  if (isError) {
    console.error('Error fetching character:', error);
    router.replace(ROUTES.NOT_FOUND);
    return null;
  }
  if (!character) return null;

  return (
    <div className="w-full mt-26">
      <div
        className={`border rounded-lg p-6 transition-all duration-100 ${
          theme === 'dark'
            ? 'bg-slate-700/80 hover:bg-slate-700 border-gray-50'
            : 'bg-slate-900/70 border-slate-400'
        }`}
      >
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
            <Image
              src={character.image}
              alt={character.name}
              width={256}
              height={256}
              className="rounded-lg object-cover"
            />
          </div>

          <div>
            <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              {character.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  Status:
                </h3>
                <p className={statusColorClass}>{character.status}</p>
              </div>

              <div>
                <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  Species:
                </h3>
                <p className={theme === 'dark' ? 'text-slate-300' : 'text-white'}>{character.species}</p>
              </div>

              <div>
                <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  Gender:
                </h3>
                <p className={theme === 'dark' ? 'text-slate-300' : 'text-white'}>{character.gender}</p>
              </div>

              <div>
                <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  Origin:
                </h3>
                <p className={theme === 'dark' ? 'text-slate-300' : 'text-white'}>{character.origin.name}</p>
              </div>

              <div className="md:col-span-2">
                <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  Location:
                </h3>
                <p className={theme === 'dark' ? 'text-slate-300' : 'text-white'}>{character.location.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
