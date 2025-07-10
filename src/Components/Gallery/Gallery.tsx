import { Component } from 'react';
import Card from '@/Components/Card/Card.tsx';

class Gallery extends Component {
  render() {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    )
  }
}

export default Gallery;
