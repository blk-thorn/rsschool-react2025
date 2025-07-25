import { render, screen } from '@testing-library/react';
import { ComponentProps } from 'react';
import { describe, it, expect } from 'vitest';
import NotFoundMessage from '@/components/NotFoundMessage';

describe('NotFoundMessage', (): void => {
  const defaultProps: ComponentProps<typeof NotFoundMessage> = {
    show: true,
    searchTerm: 'test search'
  };

  it('renders nothing when show is false', (): void => {
    const { container } = render(
      <NotFoundMessage {...defaultProps} show={false} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders message with search term when show is true', (): void => {
    render(<NotFoundMessage {...defaultProps} />);

    const message: HTMLElement = screen.getByText(/No characters found for/);
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent('"test search"');
    expect(message).toHaveClass('text-gray-500', 'text-lg');
  });

  it('has correct container classes', (): void => {
    const { container } = render(<NotFoundMessage {...defaultProps} />);

    const div: ChildNode | null = container.firstChild;
    expect(div).toHaveClass('col-span-full', 'text-center', 'py-10');
  });

  it('displays empty search term correctly', (): void => {
    render(<NotFoundMessage show={true} searchTerm="" />);

    expect(screen.getByText('No characters found for ""')).toBeInTheDocument();
  });

});
