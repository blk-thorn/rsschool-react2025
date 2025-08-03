import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { describe, it, expect, vi, Mock, afterEach, beforeEach } from 'vitest';
import MainLayout from '@/app/layout/MainLayout.tsx';
import ErrorButton from '@/components/ErrorButton';


type FooterProps = {
  isLoading: boolean;
  onErrorClick: () => void;
};

type OutletContext = {
  setIsMainLoading: (value: boolean) => void;
};

vi.mock('@/components/Header', () => ({
  default: (): ReactElement => <header data-testid="header">Header</header>,
}));

vi.mock('@/components/Footer', () => ({
  default: ({ isLoading, onErrorClick }: FooterProps): ReactElement => (
    <footer data-testid="footer">
      {!isLoading && <ErrorButton onErrorClick={onErrorClick} />}
    </footer>
  ),
}));

vi.mock('@/components/ErrorButton', () => ({
  default: ({ onErrorClick }: { onErrorClick: () => void }): ReactElement => (
    <button data-testid="error-button" onClick={onErrorClick}>
      Error Button
    </button>
  ),
}));

vi.mock('react-router-dom', () => ({
  Outlet: vi.fn(),
  useOutletContext: vi.fn(),
}));

describe('MainLayout', (): void => {
  const mockSetIsMainLoading: Mock = vi.fn();

  beforeEach((): void => {
    (Outlet as Mock).mockImplementation(
      (): ReactElement => <div data-testid="outlet">Outlet</div>
    );

    (useOutletContext as Mock).mockImplementation(() => ({
      setIsMainLoading: mockSetIsMainLoading,
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly with all nested components', () => {
    render(<MainLayout />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('error-button')).toBeInTheDocument();
  });

  it('should pass setIsMainLoading to Outlet context', (): void => {
    const TestOutlet = (): ReactElement => {
      const { setIsMainLoading } = useOutletContext<OutletContext>();
      setIsMainLoading(true);
      return <div data-testid="test-outlet">Test Outlet</div>;
    };

    (Outlet as Mock).mockImplementationOnce(TestOutlet);

    render(<MainLayout />);

    expect(mockSetIsMainLoading).toHaveBeenCalledWith(true);
    expect(screen.getByTestId('test-outlet')).toBeInTheDocument();
  });

  it('should hide ErrorButton when isLoading is true', (): void => {
    (Outlet as Mock).mockImplementationOnce(({ context }: { context: OutletContext }): ReactElement => {
      context.setIsMainLoading(true);
      return <div>Loading...</div>;
    });

    render(<MainLayout />);
    expect(screen.queryByTestId('error-button')).not.toBeInTheDocument();
  });

  it('should throw error when ErrorButton is clicked', async (): Promise<void> => {
    const originalError = console.error;
    console.error = vi.fn();

    const { unmount } = render(<MainLayout />);

    const errorButton: HTMLElement = screen.getByTestId('error-button');
    await expect((): Promise<void> => userEvent.click(errorButton)).rejects.toThrow(
      'Something went wrong. Please reload the page.'
    );

    unmount();
    console.error = originalError;
  });
});
