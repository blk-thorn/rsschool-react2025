import { Component } from 'react';

class Card extends Component {
  render() {
    return (
      <div className="flex max-w-md bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-600 dark:border-gray-600 overflow-hidden">
        <div className="relative w-1/3 min-w-[120px]">
          <img
            className="w-full h-full object-cover min-h-[140px]"
            src="https://rickandmortyapi.com/api/character/avatar/353.jpeg"
            alt="Tiny Rick"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
            <h3 className="text-white text-sm font-bold truncate">Tiny Rick</h3>
          </div>
        </div>

        <div className="w-2/3 p-2">
          <table className="w-full border-collapse">
            <tbody>
            <tr className="border border-gray-200 dark:border-gray-400">
              <td className="py-1 pr-2 font-medium text-gray-400 dark:text-gray-300 border-r border-gray-200 dark:border-gray-400">Status: </td>
              <td className="py-1 pl-2 text-gray-600 dark:text-gray-400">Dead</td>
            </tr>
            <tr className="border border-gray-200 dark:border-gray-400">
              <td className="py-1 pr-2 font-medium text-gray-400 dark:text-gray-300 border-r border-gray-200 dark:border-gray-400">Species: </td>
              <td className="py-1 pl-2 text-gray-600 dark:text-gray-400">Human</td>
            </tr>
            <tr className="border border-gray-200 dark:border-gray-400">
              <td className="py-1 pr-2 font-medium text-gray-400 dark:text-gray-300 border-r border-gray-200 dark:border-gray-400">Location: </td>
              <td className="py-1 pl-2 text-gray-600 dark:text-gray-400">Earth (Replacement Dimension)</td>
            </tr>
            <tr className="border border-gray-200 dark:border-gray-400">
              <td className="py-1 pr-2 font-medium text-gray-400 dark:text-gray-300 border-r border-gray-200 dark:border-gray-400">First seen: </td>
              <td className="py-1 pl-2 text-gray-600 dark:text-gray-400">Big Trouble in Little Sanchez</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Card;
