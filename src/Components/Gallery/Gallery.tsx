import { Component } from 'react';
import Card from '@/Components/Card/Card.tsx';

class Gallery extends Component {
  render() {
    return (
      <div className="grid gap-2 mt-8 min-sm:grid-cols-2 min-lg:grid-cols-3 min-xl:grid-cols-4 animate-fadeIn gap-2">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    )
  }
}

export default Gallery;
