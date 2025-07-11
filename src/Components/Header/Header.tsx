import { Component } from 'react';

class Header extends Component{
  render() {
    return (
      <div className="flex flex-col items-center justify-center">
      <img src="/logo.webp" alt="" className="rounded-full w-40 h-40" ></img>
      <h1 className="text-center mt-8 mb-8 font-bold text-5xl text-blue-400">The Rick and Morty API</h1>
      </div>
    )
  }
}

export default Header;
