import { Component, ErrorInfo } from 'react';
import { EmptyVoid, ErrorBoundaryProps, ErrorBoundaryState } from '@/types/types.ts';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: undefined,
    errorInfo: undefined
  };

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error, errorInfo });
  }

  resetError: EmptyVoid = (): void => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined
    });
  };

  handleReload: EmptyVoid = (): void => {
    this.resetError();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1 className="mt-40 mb-10 p-4 text-4xl text-red-800 rounded-lg dark:text-red-400">
            Something went wrong. Please reload the page
          </h1>
          <button
            className="focus:outline-none text-black border-3 border-blue-100 shadow-md shadow-blue-400/60 bg-blue-50 hover:bg-blue-100 focus:ring-1 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer"
            onClick={this.handleReload}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
