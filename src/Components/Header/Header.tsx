import { Component, ReactNode } from 'react';

class Header extends Component{
  render(): ReactNode {
    return (
      <header className="flex flex-col items-center justify-center">
        <img src="/favicon.ico" alt="logo" className="rounded-full w-40 h-40 border-5" ></img>
        <h1 className="text-center mt-8 mb-8 font-bold text-5xl text-blue-400">The Rick and Morty API</h1>
      </header>
    )
  }
}

export default Header;
