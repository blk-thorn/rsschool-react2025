import { render, screen } from '@testing-library/react';
import { ReactElement } from 'react';
import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';
import ErrorButton from '@/components/ErrorButton.tsx';
import Footer from '@/components/Footer.tsx';
import { ErrorButtonProps } from '@/types/types.ts';

vi.mock('@/components/ErrorButton.tsx', () => ({
  default: vi.fn((props: ErrorButtonProps): ReactElement => <button data-testid="mock-error-button" onClick={props.onErrorClick}>Error Button</button>)
}));

describe('Footer Component', (): void => {
  const mockErrorClick: Mock = vi.fn();

  beforeEach((): void => {
    vi.clearAllMocks();
  });

  it('should not render anything when isLoading is true', (): void => {
    const { container } = render(<Footer isLoading={true} onErrorClick={mockErrorClick} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render footer element when isLoading is false', (): void => {
    render(<Footer isLoading={false} onErrorClick={mockErrorClick} />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('should render ErrorButton when not loading', (): void => {
    render(<Footer isLoading={false} onErrorClick={mockErrorClick} />);
    expect(screen.getByTestId('mock-error-button')).toBeInTheDocument();
  });

  it('should pass onErrorClick prop to ErrorButton', (): void => {
    render(<Footer isLoading={false} onErrorClick={mockErrorClick} />);

    expect(vi.mocked(ErrorButton).mock.calls.some((call: [ErrorButtonProps]): boolean =>
      call[0]?.onErrorClick === mockErrorClick
    )).toBe(true);
  });

  it('should not render ErrorButton when loading', (): void => {
    render(<Footer isLoading={true} onErrorClick={mockErrorClick} />);
    expect(screen.queryByTestId('mock-error-button')).toBeNull();
  });
});
