import { Component, ReactElement } from 'react';
import { NotFoundMessageProps } from '@/types/types.ts';

class NotFoundMessage extends Component<NotFoundMessageProps> {
  render (): ReactElement | null {
    const { searchTerm } = this.props;
    if (!this.props.show) return null;
    return (
      <div className="col-span-full text-center py-10">
        <p className="text-gray-500 text-lg">
          No characters found for "{searchTerm}"
        </p>
      </div>
    )
  }
}

export default NotFoundMessage;
