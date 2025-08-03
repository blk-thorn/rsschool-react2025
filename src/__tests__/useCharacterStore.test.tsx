import { act, fireEvent, render,screen } from '@testing-library/react';
import { ReactElement } from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useCharacterStore } from '@/store/useCharacterStore.ts';

const mockStore = {
  selectedCharacterId: null as number | null,
  selectedItems: [] as number[],
  setSelectedCharacterId: vi.fn((id: number | null): void => {
    mockStore.selectedCharacterId = id;
  }),
  clearSelectedCharacter: vi.fn((): void => {
    mockStore.selectedCharacterId = null;
  }),
  toggleItem: vi.fn((id: number): void => {
    mockStore.selectedItems = mockStore.selectedItems.includes(id)
      ? mockStore.selectedItems.filter((itemId: number): boolean => itemId !== id)
      : [...mockStore.selectedItems, id];
  }),
  unselectAll: vi.fn((): void => {
    mockStore.selectedItems = [];
  }),
  isItemSelected: vi.fn((id: number): boolean => mockStore.selectedItems.includes(id)),
  getSelectedCount: vi.fn((): number => mockStore.selectedItems.length),
};

vi.mock('@/stores/characterStore', () => ({
  useCharacterStore: () => mockStore,
}));

function TestComponent(): ReactElement {
  const {
    selectedCharacterId,
    selectedItems,
    setSelectedCharacterId,
    clearSelectedCharacter,
    toggleItem,
    unselectAll,
    isItemSelected,
    getSelectedCount,
  } = useCharacterStore();

  return (
    <div>
      <div data-testid="selectedId">{selectedCharacterId}</div>
      <div data-testid="selectedItems">{selectedItems.join(',')}</div>
      <button onClick={(): void => setSelectedCharacterId(1)}>Set Character</button>
      <button onClick={clearSelectedCharacter}>Clear Character</button>
      <button onClick={(): void => toggleItem(1)}>Toggle Item</button>
      <button onClick={unselectAll}>Unselect All</button>
      <div data-testid="isSelected">{isItemSelected(1).toString()}</div>
      <div data-testid="selectedCount">{getSelectedCount()}</div>
    </div>
  );
}

describe('Character Store', (): void => {
  beforeEach((): void => {
    mockStore.selectedCharacterId = null;
    mockStore.selectedItems = [];
    vi.clearAllMocks();
  });

  it('should mock store functions', (): void => {
    expect(mockStore.setSelectedCharacterId).toBeDefined();
    expect(mockStore.clearSelectedCharacter).toBeDefined();
    expect(mockStore.toggleItem).toBeDefined();
    expect(mockStore.unselectAll).toBeDefined();
    expect(mockStore.isItemSelected).toBeDefined();
    expect(mockStore.getSelectedCount).toBeDefined();
  });

  it('should unselect all items', (): void => {
    act((): void => {
      mockStore.toggleItem(1);
      mockStore.toggleItem(2);
      mockStore.unselectAll();
    });

    expect(mockStore.selectedItems).toEqual([]);
    expect(mockStore.unselectAll).toHaveBeenCalled();
    expect(mockStore.getSelectedCount()).toBe(0);
  });

  it('should call setSelectedCharacterId when button clicked', (): void => {
    const setSelectedSpy = vi.spyOn(useCharacterStore.getState(), 'setSelectedCharacterId');

    render(<TestComponent />);

    const button: HTMLButtonElement = screen.getByRole('button', { name: /set character/i });
    fireEvent.click(button);

    expect(setSelectedSpy).toHaveBeenCalledWith(1);
    expect(setSelectedSpy).toHaveBeenCalledTimes(1);
  });
});
