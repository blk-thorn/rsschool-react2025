'use client';

import { useTranslations } from 'next-intl';
import { Component, ErrorInfo, ReactNode } from 'react';
import { useTheme } from '@/context/UseTheme';
import { EmptyVoid, ErrorBoundaryProps, ErrorBoundaryState, Theme } from '@/types/types';

interface ThemedErrorBoundaryProps extends ErrorBoundaryProps {
  theme: Theme;
  translate: ReturnType<typeof useTranslations<'ErrorBoundary'>>;
}

class ErrorBoundaryBase extends Component<ThemedErrorBoundaryProps, ErrorBoundaryState> {
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
    console.error(error, errorInfo);
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

  render(): ReactNode {
    const { theme, translate } = this.props;

    if (this.state.hasError) {
      return (
        <main>
          <div className="animate-bounce">
            <h1 className={`mt-40 p-4 text-4xl rounded-lg ${theme === 'dark' ? 'text-red-400' : 'text-sky-600'}`}>
              {translate('title')}
            </h1>
            <p className={`mb-10 text-3xl rounded-lg ${theme === 'dark' ? 'text-red-400' : 'text-sky-600'}`}>
              {translate('description')}
            </p>
          </div>
          <button
            className={`focus:outline-none text-lg font-medium rounded-lg px-5 py-2.5 me-2 mb-2 cursor-pointer
              border-2 shadow-sm focus:ring-1
              ${theme === 'dark'
              ? 'text-white border-slate-600 shadow-slate-600/60 bg-slate-700 hover:bg-slate-600 focus:ring-slate-500'
              : 'text-black border-sky-100 shadow-sky-400/60 bg-sky-50 hover:bg-sky-100 focus:ring-sky-200'
            }`}
            onClick={this.handleReload}
          >
            {translate('reload')}
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}

export default function ErrorBoundary(props: ErrorBoundaryProps): ReactNode {
  const { theme } = useTheme();
  const translate = useTranslations('ErrorBoundary');
  return <ErrorBoundaryBase {...props} theme={theme} translate={translate} />;
}
