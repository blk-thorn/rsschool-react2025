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
    console.log(error, errorInfo);
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
        <main>
          <div className="animate-bounce">
          <h1 className="mt-40 p-4 text-4xl text-red-800 rounded-lg dark:text-red-400">
            Something went wrong...
          </h1>
          <p className="mb-10 text-3xl text-red-800 rounded-lg dark:text-red-400">
            Please reload the page.
          </p>
          </div>
          <button
            className="focus:outline-none text-lg text-black border-2 border-sky-100 shadow-sm shadow-sky-400/60 bg-sky-50 hover:bg-sky-100 focus:ring-1 focus:ring-sky-200 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 cursor-pointer"
            onClick={this.handleReload}
          >
            Start Over
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
