import { CharacterStatus, getStatusFunction } from '@/types/types.ts';

export const getStatusColor: getStatusFunction = (status: string): string => {
  switch (status) {
    case CharacterStatus.Alive:
      return 'text-emerald-300';
    case CharacterStatus.Dead:
      return 'text-rose-400';
    case CharacterStatus.Unknown:
      return 'text-sky-200';
    default:
      return 'text-sky-200';
  }
};
