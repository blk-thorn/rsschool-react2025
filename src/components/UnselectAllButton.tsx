"use client";

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from "next/navigation";
import { JSX } from "react";
import { useTheme } from '@/context/UseTheme';
import { useCharacterStore } from "@/store/useCharacterStore";
import { EmptyVoid } from '@/types/types';

export default function UnselectAllButton(): JSX.Element {
  const router: AppRouterInstance = useRouter();
  const { unselectAll } = useCharacterStore();
  const { theme } = useTheme();

  const handleClick: EmptyVoid = (): void => {
    unselectAll();
    document.cookie = "selected-ids=; Path=/; Max-Age=0; SameSite=Lax";
    router.refresh();
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${
        theme === "dark"
          ? "bg-slate-600 hover:bg-slate-700 text-slate-300"
          : "bg-sky-700 hover:bg-sky-800 text-white"
      }`}
    >
      Unselect all
    </button>
  );
}
