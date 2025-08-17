import { create, StoreApi, UseBoundStore } from "zustand";

interface CharacterStore {
  selectedCharacterId: number | null;
  selectedItems: number[];
  setSelectedCharacterId: (id: number | null) => void;
  clearSelectedCharacter: () => void;
  toggleItem: (id: number) => void;
  unselectAll: () => void;
  isItemSelected: (id: number) => boolean;
  getSelectedCount: () => number;
  hydrateFromCookies: () => void;
}

function syncToCookies(items: number[]): void {
  if (typeof document !== "undefined") {
    document.cookie = `selected-ids=${items.join(",")}; path=/; SameSite=Lax`;
  }
}

function readFromCookies(): number[] {
  if (typeof document === "undefined") return [];
  const match: RegExpMatchArray = document.cookie.match(/(?:^|; )selected-ids=([^;]*)/);
  return match?.[1] ? match[1].split(",").map(Number) : [];
}

export const useCharacterStore: UseBoundStore<StoreApi<CharacterStore>> =
  create<CharacterStore>((set, get: () => CharacterStore) => ({
    selectedCharacterId: null,
    selectedItems: [],

    setSelectedCharacterId: (id: number | null): void =>
      set({ selectedCharacterId: id }),

    clearSelectedCharacter: (): void => set({ selectedCharacterId: null }),

    toggleItem: (id: number): void =>
      set((state: CharacterStore):{selectedItems:number[]} => {
        const newItems: number[] = state.selectedItems.includes(id)
          ? state.selectedItems.filter(
            (itemId: number): boolean => itemId !== id
          )
          : [...state.selectedItems, id];

        syncToCookies(newItems);
        return { selectedItems: newItems };
      }),

    unselectAll: (): void => {
      syncToCookies([]);
      set({ selectedItems: [] });
    },

    isItemSelected: (id: number): boolean =>
      get().selectedItems.includes(id),

    getSelectedCount: (): number => get().selectedItems.length,

    hydrateFromCookies: (): void => {
      const items: number[] = readFromCookies();
      set({ selectedItems: items });
    },
  }));
