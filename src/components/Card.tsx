import { Component, ReactNode } from 'react';
import {CardProps} from '@/types/types.ts';
import { CharacterStatus } from '@/types/types.ts';


class Card extends Component<CardProps> {

  getStatusColor(status: string): string {
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
  }

  render(): ReactNode {
    const { character } = this.props;
    const statusColorClass: string = this.getStatusColor(character.status);

    return (
      <div data-testid="character-card" className="flex items-center max-w-xl bg-slate-600 border border-slate-200 rounded-lg shadow-sm dark:border-slate-600 overflow-hidden">
        <div className="relative w-3/4 min-w-120px">
          <img
            className="w-full h-full object-cover min-h-58 rounded-lg min-w-33"
            src={character.image}
            alt="Tiny Rick"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 rounded-lg">
            <h3 className="text-white text-md font-bold truncate">
              {character.name}
            </h3>
          </div>
        </div>
        <ul className="flex flex-col text-left py-3 px-4 w-2/3">
          <li className="mb-1 flex">
            <span className="block text-white font-medium">Status:</span>
            <span className={`mx-2 font-medium ${statusColorClass}`}>
              {character.status}
            </span>
          </li>
          <li className="mb-1 flex flex-col">
            <span className="block text-white font-medium">Gender:</span>
            <span className="text-slate-300 mx-2">{character.gender}</span>
          </li>
          <li className="mb-1 flex flex-col">
            <span className="block text-white font-medium">Species:</span>
            <span className="text-slate-300 mx-2">{character.species}</span>
          </li>
          <li className="mb-1 flex flex-col">
            <span className="block text-white font-medium">Location:</span>
            <span className="text-slate-300 mx-2">
              {character.location.name}
            </span>
          </li>
        </ul>
      </div>
    );
  }
}

export default Card;
