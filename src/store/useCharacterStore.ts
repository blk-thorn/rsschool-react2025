import { create, StoreApi, UseBoundStore } from 'zustand';

interface CharacterStore {
  selectedCharacterId: number | null;
  selectedItems: number[];
  setSelectedCharacterId: (id: number | null) => void;
  clearSelectedCharacter: () => void;
  toggleItem: (id: number) => void;
  unselectAll: () => void;
  isItemSelected: (id: number) => boolean;
  getSelectedCount: () => number;
}

export const useCharacterStore: UseBoundStore<StoreApi<CharacterStore>>  = create<CharacterStore>((set, get) => ({
  selectedCharacterId: null,
  selectedItems: [],

  setSelectedCharacterId: (id: number | null): void => set({ selectedCharacterId: id }),
  clearSelectedCharacter: (): void => set({ selectedCharacterId: null }),

  toggleItem: (id: number): void => set((state: CharacterStore): {selectedItems: number[]} => ({
    selectedItems: state.selectedItems.includes(id)
      ? state.selectedItems.filter((itemId: number): boolean => itemId !== id)
      : [...state.selectedItems, id]
  })),

  unselectAll: (): void => set({ selectedItems: [] }),

  isItemSelected: (id: number): boolean => get().selectedItems.includes(id),

  getSelectedCount: (): number => get().selectedItems.length,
}));
