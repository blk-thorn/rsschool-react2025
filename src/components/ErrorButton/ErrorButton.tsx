import { Component, ReactElement } from 'react';
import { ClickEvent, ClickFunction, ErrorButtonProps } from '@/types/types.ts';

class ErrorButton extends Component<ErrorButtonProps> {
  handleClick: ClickFunction = (e: ClickEvent): void => {
    e.preventDefault();
    this.props.onErrorClick();
  }

  render(): ReactElement {
    return (
      <button
        onClick={this.handleClick}
        type="button"
        className="focus:outline-none text-gray-50 bg-rose-600 hover:bg-rose-700 focus:ring-1 focus:ring-rose-300 font-medium rounded-lg text-md px-20 py-3 me-2 mb-2 dark:bg-rose-500 dark:hover:bg-rose-600 dark:focus:ring-rose-600 float-right cursor-pointer">
        Error Button
      </button>
    )
  }
}

export default ErrorButton;
