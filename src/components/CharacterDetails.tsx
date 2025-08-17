"use client";

import Image from 'next/image';
import { useSearchParams, useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import { ReactElement, useEffect } from "react";
import Loader from "@/components/Loader";
import { useTheme } from '@/context/UseTheme';
import { useCharacterQuery } from "@/hooks/useQueries";
import { useCharacterStore } from "@/store/useCharacterStore";
import { Character, EmptyVoid } from '@/types/types';
import { queryClient } from "@/utils/queryClient";
import { useStatusColor } from "@/utils/useStatusColor";

interface CharacterDetailsProps {
  id: number;
}

export default function CharacterDetails({ id }: CharacterDetailsProps): ReactElement | null {
  const { data: character, isLoading, isError, error } = useCharacterQuery(id);
  const { toggleItem, isItemSelected } = useCharacterStore();
  const { theme } = useTheme();
  const statusColorClass: string = useStatusColor(character?.status || "");
  const t = useTranslations('CharacterDetails');

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClose: EmptyVoid = (): void => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("details");

    const query: string = newParams.toString();
    router.push(query ? `?${query}` : ".");
  };

  const handleCheckboxClick: EmptyVoid = (): void => {
    if (character) {
      toggleItem(character.id);
    }
  };

  useEffect((): void => {
    if (id) {
      const characterCache: Character = queryClient.getQueryData<Character>(["character", id]);
      console.log("Character cache:", characterCache);
    }
  }, [id]);

  if (isLoading) return <Loader />;
  if (isError) {
    console.error("Error fetching character:", error);
    return null;
  }
  if (!character) return null;

  return (
    <div className="w-full mt-26">
      <div
        className={`border rounded-lg p-6 transition-all duration-100 ${
          theme === "dark"
            ? "bg-slate-700/80 hover:bg-slate-700 border-gray-50"
            : "bg-slate-900/70 border-slate-400"
        }`}
      >
        <div className="flex justify-between items-start mb-4">
          <input
            type="checkbox"
            checked={isItemSelected(character.id)}
            onChange={handleCheckboxClick}
            className="w-5 h-5 cursor-pointer"
          />

          <button
            onClick={handleClose}
            className={`text-xl cursor-pointer ${theme === "dark" ? "text-slate-300" : "text-white"}`}
          >
            &times; Close
          </button>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex justify-center">
            <Image
              src={character.image}
              alt={character.name}
              width={600}
              height={600}
              className="rounded-lg w-64 h-64 object-cover"
            />
          </div>

          <div>
            <h2 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-black"}`}>
              {character.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className={`text-lg font-medium mb-4 ${theme === "dark" ? "text-white" : "text-black"}`}>
                  {t("status")}
                </h3>
                <p className={statusColorClass}>{character.status}</p>
              </div>

              <div>
                <h3 className={`text-lg font-medium mb-4 ${theme === "dark" ? "text-white" : "text-black"}`}>
                  {t("species")}
                </h3>
                <p className={theme === "dark" ? "text-slate-300" : "text-white"}>
                  {character.species}
                </p>
              </div>

              <div>
                <h3 className={`text-lg font-medium mb-4 ${theme === "dark" ? "text-white" : "text-black"}`}>
                  {t("gender")}
                </h3>
                <p className={theme === "dark" ? "text-slate-300" : "text-white"}>
                  {character.gender}
                </p>
              </div>

              <div>
                <h3 className={`text-lg font-medium mb-4 ${theme === "dark" ? "text-white" : "text-black"}`}>
                  {t("origin")}
                </h3>
                <p className={theme === "dark" ? "text-slate-300" : "text-white"}>
                  {character.origin.name}
                </p>
              </div>

              <div className="md:col-span-2">
                <h3 className={`text-lg font-medium mb-4 ${theme === "dark" ? "text-white" : "text-black"}`}>
                  {t("location")}
                </h3>
                <p className={theme === "dark" ? "text-slate-300" : "text-white"}>
                  {character.location.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
