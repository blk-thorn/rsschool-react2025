import { Component } from 'react';
import Header from './Components/Header/Header.tsx'
import SearchBar from '@/Components/SearchBar/SearchBar.tsx';
import Gallery from '@/Components/Gallery/Gallery.tsx';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <SearchBar />
        <Gallery />
      </>
    );
  }
}

export default App;
