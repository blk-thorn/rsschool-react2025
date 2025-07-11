import { Component } from 'react';
import Card from '@/Components/Card/Card.tsx';
import type { Character, ApiResponse, GalleryState, SuperProps } from '@/types/types.ts';

class Gallery extends Component<object, GalleryState> {
  constructor(props: SuperProps) {
   super(props);
   this.state = {
     characters:[],
     totalPages: 0
   }
  }

  currentPage: number = 1;

  loadPage = (page: number) => {
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then(res => res.json())
      .then((data: ApiResponse) => {
        this.setState({
          characters: data.results,
          totalPages: data.info.pages
        });
        this.currentPage = page;
      });
  }

  componentDidMount() {
    this.loadPage(1);
  }

  handleNextPage = () => {
    if (this.currentPage < this.state.totalPages) {
      this.loadPage(this.currentPage + 1);
    }
  }

  handlePrevPage = () => {
    if (this.currentPage > 1) {
      this.loadPage(this.currentPage - 1);
    }
  }

  render() {
    console.log('Characters:', this.state.characters);

    return (
      <>
      <div className="grid gap-2 mt-10 min-sm:grid-cols-2 min-lg:grid-cols-3 min-xl:grid-cols-4 justify-center">
        {this.state.characters.map((character: Character) => (
          <Card
            key={character.id}
            character={character}
          />
        ))}
      </div>
        <div className="flex justify-center my-4">
          <button
            onClick={this.handlePrevPage}
            disabled={this.currentPage === 1}
            className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-400 rounded-lg hover:bg-blue-500 focus:ring-1 focus:outline-none focus:ring-blue-300"
          >
            Prev
          </button>
          <span className="px-4 py-2">
            Page {this.currentPage} of {this.state.totalPages}
          </span>
          <button
            onClick={this.handleNextPage}
            disabled={this.currentPage >= this.state.totalPages}
            className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-400 rounded-lg hover:bg-blue-500 focus:ring-1 focus:outline-none focus:ring-blue-300"
          >
            Next
          </button>
        </div>
     </>
    )
  }
}

export default Gallery;
