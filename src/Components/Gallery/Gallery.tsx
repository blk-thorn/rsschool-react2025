import { Component } from 'react';
import Card from '@/Components/Card/Card.tsx';
import type { Character, ApiResponse, GalleryState, SuperProps } from '@/types/types.ts';

class Gallery extends Component<object, GalleryState> {
  constructor(props: SuperProps) {
   super(props);
   this.state = {characters:[]}
  }

  componentDidMount() {
    fetch('https://rickandmortyapi.com/api/character/?page=1')
      .then(res => res.json())
      .then((data: ApiResponse) => {this.setState({characters: data.results})})
  }

  render() {
    console.log('Characters:', this.state.characters);

    return (
      <div className="grid gap-2 mt-8 min-sm:grid-cols-2 min-lg:grid-cols-3 min-xl:grid-cols-4 animate-fadeIn">
        {this.state.characters.map((character: Character) => (
          <Card
            key={character.id}
            character={character}
          />
        ))}
      </div>
    )
  }
}

export default Gallery;
