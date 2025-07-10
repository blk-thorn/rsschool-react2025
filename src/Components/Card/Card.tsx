import { Component } from 'react';

class Card extends Component {
  render() {
    return (
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-500 dark:border-gray-600 overflow-hidden">
        <article
          className="relative isolate flex flex-col justify-end px-8 pb-8 pt-40 max-w-sm mx-auto">
          <img src="./public/peakpx.jpg" alt="character" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
          <h3 className="z-10 mt-5 text-2xl font-bold text-white">Status: Alive</h3>
        </article>
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Some character</h5>
          <ul className="mb-3 font-normal text-gray-400 dark:text-gray-200 text-left">
            <li>Species:</li>
            <li>Last known location:</li>
            <li>First seen in:</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Card;
