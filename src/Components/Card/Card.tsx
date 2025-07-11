import { Component } from 'react';
import {CardProps} from '@/types/types.ts';

class Card extends Component<CardProps> {
  render() {
    const { character } = this.props;

    return (
      <div className="flex max-w-md bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-600 dark:border-gray-600 overflow-hidden">
        <div className="relative w-2/4 min-w-[120px]">
          <img
            className="w-full h-full object-cover min-h-[140px]"
            src={character.image}
            alt="Tiny Rick"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
            <h3 className="text-white text-sm font-bold truncate">
              {character.name}
            </h3>
          </div>
        </div>
        <ul className="flex flex-col text-left py-3 px-4 w-2/3">
          <li className="mb-1 flex">
            <span className="block text-white font-medium">Status:</span>
            <span className="text-gray-300 mx-2">{character.status}</span>
          </li>
          <li className="mb-1 flex">
            <span className="block text-white font-medium">Gender:</span>
            <span className="text-gray-300 mx-2">{character.gender}</span>
          </li>
          <li className="mb-1 flex">
            <span className="block text-white font-medium">Species:</span>
            <span className="text-gray-300 mx-2">{character.species}</span>
          </li>
          <li className="mb-1 flex flex-col">
            <span className="block text-white font-medium">Location:</span>
            <span className="text-gray-300 mx-2">{character.location.name}</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default Card;
