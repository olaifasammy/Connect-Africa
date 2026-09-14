import { Component, type ErrorInfo, type ReactNode } from 'react';
import { ErrorPage } from '../pages/ErrorPage';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled Exception caught by Boundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      const errorMessage = this.state.error?.message || 'An unhandled exception occurred in the presentation layer.';
      const stackTrace = this.state.error?.stack || 'No detailed stack trace available.';
      
      const breadcrumbs = [
        'SYSTEM: Application initialized',
        'ROUTER: Path matching presentation layers',
        'EVENT: Presentation element mount completed',
        `EXCEPTION: Uncaught component runtime error - ${errorMessage}`
      ];

      return (
        <ErrorPage
          statusCode={500}
          errorTitle="Runtime Rendering Error"
          errorMessage={errorMessage}
          stackTrace={stackTrace}
          breadcrumbs={breadcrumbs}
          onReset={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}
