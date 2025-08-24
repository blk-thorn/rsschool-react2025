import { useTheme } from '@/context/UseTheme';
import { CharacterStatus } from '@/types/types';

export function useStatusColor(status: string): string {
  const { theme } = useTheme();

  switch (status) {
    case CharacterStatus.Alive:
      return theme === 'dark' ? 'text-emerald-400' : 'text-emerald-300';
    case CharacterStatus.Dead:
      return theme === 'dark' ? 'text-rose-400' : 'text-rose-300';
    case CharacterStatus.Unknown:
      return theme === 'dark' ? 'text-sky-400' : 'text-sky-300';
    default:
      return theme === 'dark' ? 'text-sky-400' : 'text-sky-300';
  }
};
