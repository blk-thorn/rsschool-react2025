'use client';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Image from 'next/image';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { JSX } from 'react';
import { useTheme } from '@/context/UseTheme';
import { useCharacterStore } from '@/store/useCharacterStore';
import { CardProps } from '@/types/types';
import { useStatusColor } from '@/utils/useStatusColor';

export default function Card({ character, isSelected }: CardProps & { isSelected: boolean }): JSX.Element {
  const { toggleItem, setSelectedCharacterId } = useCharacterStore();
  const { theme } = useTheme();
  const router: AppRouterInstance = useRouter();
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const t = useTranslations('Card');

  const statusColorClass: string = useStatusColor(character.status);

  const handleCardClick: () => void = (): void => {
    setSelectedCharacterId(character.id);

    const params = new URLSearchParams(searchParams.toString());
    params.set('details', character.id.toString());
    router.push(`?${params.toString()}`);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.stopPropagation();
    toggleItem(character.id);
  };

  return (
    <button
      onClick={handleCardClick}
      data-testid="character-card"
      className={`flex items-center max-w-xl border rounded-lg shadow-sm overflow-hidden hover:scale-105 transition-all duration-100 cursor-pointer ${
        theme === "dark"
          ? "bg-slate-600/80 hover:bg-slate-700 border-gray-50"
          : "bg-slate-800/60 border-slate-400"
      }`}
    >
      <div className="relative w-3/4 min-w-[120px]">
        <Image
          className="w-full h-full object-cover min-h-58 rounded-lg min-w-33"
          src={character.image}
          alt={character.name}
          width={300}
          height={300}
        />
        <div className="absolute top-2 left-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckboxChange}
            className="w-5 h-5 cursor-pointer"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 rounded-lg">
          <h3
            className={`block font-bold text-lg rounded-md truncate ${
              theme === "dark"
                ? "text-white bg-slate-500/90"
                : "text-black bg-slate-100/90"
            }`}
          >
            {character.name}
          </h3>
        </div>
      </div>

      <ul className="flex flex-col text-left py-3 px-4 w-2/3">
        <li className="mb-1 flex flex-col">
          <span className={`block font-bold text-lg ${theme === "dark" ? "text-white" : "text-black"}`}>
            {t("status")}
          </span>
          <span className={`mx-2 font-medium ${statusColorClass}`}>
            {character.status}
          </span>
        </li>
        <li className="mb-1 flex flex-col">
          <span className={`block font-bold text-lg ${theme === "dark" ? "text-white" : "text-black"}`}>
            {t("gender")}
          </span>
          <span className={`block text-lg mx-2 ${theme === "dark" ? "text-slate-300" : "text-white"}`}>
            {character.gender}
          </span>
        </li>
        <li className="mb-1 flex flex-col">
          <span className={`block font-bold text-lg ${theme === "dark" ? "text-white" : "text-black"}`}>
            {t("species")}
          </span>
          <span className={`block text-lg mx-2 ${theme === "dark" ? "text-slate-300" : "text-white"}`}>
            {character.species}
          </span>
        </li>
        <li className="mb-1 flex flex-col">
          <span className={`block font-bold text-lg ${theme === "dark" ? "text-white" : "text-black"}`}>
            {t("location")}
          </span>
          <span className={`block text-lg mx-2 ${theme === "dark" ? "text-slate-300" : "text-white"}`}>
            {character.location.name}
          </span>
        </li>
      </ul>
    </button>
  );
}
