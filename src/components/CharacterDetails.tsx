'use client';

import { useTranslations } from 'next-intl';
import { JSX } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Character } from '@/types/types';
import { useStatusColor } from '@/utils/useStatusColor';

interface Props {
  character?: Character;
  onClose?: () => void;
  onToggleFavorite?: (id: number) => void;
  isFavorite?: boolean;
}

export default function CharacterDetails({ character, onClose, onToggleFavorite, isFavorite }: Props): JSX.Element {
  const t = useTranslations('CharacterDetails');
  const { theme } = useTheme();

  const statusColorClass: string = useStatusColor(character?.status ?? '');

  if (!character) return null;

  return (
    <div className="w-full mt-26">
      <div
        className={`border rounded-lg p-6 transition-all duration-100
        ${theme === 'dark'
          ? 'bg-slate-700/80 hover:bg-slate-700 border-gray-50'
          : 'bg-slate-900/70 border-slate-400'
        }`}
      >
        <div className="flex justify-between items-start mb-4">
          {onClose && (
            <button onClick={onClose} className={`text-xl cursor-pointer ${theme === 'dark' ? 'text-slate-300' : 'text-white'}`}>
              × {t('close')}
            </button>
          )}
          {onToggleFavorite && (
            <input type="checkbox" checked={isFavorite} onChange={(): void => onToggleFavorite(character.id)} className="w-5 h-5 cursor-pointer"
            />
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex justify-center">
            <img src={character.image} alt={character.name} className="rounded-lg w-64 h-64 object-cover"
            />
          </div>

          <div>
            <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              {character.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  {t('status')}:
                </h3>
                <p className={statusColorClass}>{character.status}</p>
              </div>

              <div>
                <h3 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  {t('species')}:
                </h3>
                <p className={theme === 'dark' ? 'text-slate-300' : 'text-white'}>
                  {character.species}
                </p>
              </div>

              <div>
                <h3 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  {t('gender')}:
                </h3>
                <p className={theme === 'dark' ? 'text-slate-300' : 'text-white'}>
                  {character.gender}
                </p>
              </div>

              <div>
                <h3 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  {t('origin')}:
                </h3>
                <p className={theme === 'dark' ? 'text-slate-300' : 'text-white'}>
                  {character.origin?.name}
                </p>
              </div>

              <div className="md:col-span-2">
                <h3 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  {t('location')}:
                </h3>
                <p className={theme === 'dark' ? 'text-slate-300' : 'text-white'}>
                  {character.location?.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
