import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { cookies } from "next/headers";
import { JSX } from "react";
import UnselectAllButton from "./UnselectAllButton";
import { Character } from "@/types/types";
import { getCharactersByIds } from "@/utils/api";

async function generateCsv(ids: number[]): Promise<string> {
  const characters: Character[] = await getCharactersByIds(ids);

  const headers: string[] = ["Name", "Status", "Species", "Gender", "Location", "Details URL"];
  const rows: string[][] = characters.map((char: Character): string[] => [
    `"${char.name}"`,
    `"${char.status}"`,
    `"${char.species}"`,
    `"${char.gender}"`,
    `"${char.location.name}"`,
    `"${process.env.NEXT_PUBLIC_APP_URL}/?details=${char.id}"`,
  ]);

  return [headers.join(","), ...rows.map((r: string[]): string => r.join(","))].join("\n");
}

export default async function DownloadFlyout(): Promise<JSX.Element | null> {
  const cookieStore: ReadonlyRequestCookies = await cookies();
  const selectedIdsCookie: string = cookieStore.get("selected-ids")?.value ?? "";
  const ids: number[] = selectedIdsCookie
    ? selectedIdsCookie.split(",").map((id: string): number => Number(id))
    : [];

  if (ids.length === 0) return null;

  const csvContent: string = await generateCsv(ids);
  const blob: Buffer = Buffer.from(csvContent, "utf-8");
  const base64: string = blob.toString("base64");

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 border rounded-lg shadow-lg p-4 z-50 bg-slate-800 border-slate-400">
      <div className="flex items-center justify-between gap-4">
        <div className="text-slate-300">
          {ids.length} {ids.length === 1 ? "item" : "items"} selected
        </div>
        <div className="flex gap-2">
          <UnselectAllButton />
          <a
            href={`data:text/csv;base64,${base64}`}
            download={`${ids.length}_items.csv`}
            className="px-4 py-2 rounded-md transition-colors cursor-pointer dark:bg-slate-600 dark:hover:bg-slate-700 dark:text-slate-300 bg-sky-700 hover:bg-sky-800 text-white"
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
}
