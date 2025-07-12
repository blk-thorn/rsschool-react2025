import { Component, ReactElement } from 'react';

interface ErrorButtonProps {
  onErrorClick: () => void;
}

class ErrorButton extends Component<ErrorButtonProps> {
  handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    this.props.onErrorClick();
  }

  render(): ReactElement {
    return (
      <button
        onClick={this.handleClick}
        type="button"
        className="focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-1 focus:ring-red-300 font-medium rounded-lg text-md px-20 py-3 me-2 mb-2 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-600 float-right cursor-pointer">
        Error Button
      </button>
    )
  }
}

export default ErrorButton;
