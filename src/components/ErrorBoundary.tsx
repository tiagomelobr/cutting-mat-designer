import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    // Clear localStorage and reload
    try {
      localStorage.removeItem('cutting-mat-config');
      window.location.reload();
    } catch (e) {
      console.error('Failed to clear config:', e);
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-base-200">
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-error">Application Error</h2>
              <p className="text-sm">Something went wrong. This might be due to an outdated configuration.</p>
              
              {this.state.error && (
                <div className="mockup-code text-xs mt-2">
                  <pre><code>{this.state.error.message}</code></pre>
                </div>
              )}
              
              <div className="card-actions justify-end mt-4">
                <button onClick={this.handleReset} className="btn btn-primary">
                  Clear Config & Reload
                </button>
              </div>
              
              <div className="text-xs text-base-content/60 mt-2">
                This will clear your saved settings and reload with defaults.
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
