import { Component } from 'react';

class Header extends Component{
  render() {
    return (
      <div className="flex flex-col items-center justify-center">
      <img src="./public/logo.webp" alt="" className="rounded-full w-50 h-50" ></img>
      <h1 className="text-center mt-10 mb-10 font-bold text-5xl text-blue-400">The Rick and Morty API</h1>
      </div>
    )
  }
}

export default Header;
