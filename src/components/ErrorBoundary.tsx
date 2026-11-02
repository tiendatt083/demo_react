import { Component, ErrorInfo, ReactNode } from 'react';
import '../styles/ErrorBoundary.css';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * React Error Boundary Component
 * Bắt lỗi JavaScript trong component con và hiển thị giao diện dự phòng tinh tế, không lạm dụng icon.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[ErrorBoundary] Lỗi render:', error, errorInfo);
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  private handleReload = (): void => {
    window.location.reload();
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div role="alert" className="error-boundary-card">
          <div>
            <h4 className="error-boundary-title">
              Sự cố hiển thị chi tiết đặt phòng (Đã bắt bởi Error Boundary)
            </h4>
            <p className="error-boundary-desc">
              Tiến trình render của component phòng bị gián đoạn, nhưng Error Boundary đã cô lập lỗi để form đặt phòng vẫn hoạt động bình thường.
            </p>
          </div>

          {this.state.error && (
            <div className="error-boundary-details">
              <strong>Chi tiết lỗi:</strong> {this.state.error.toString()}
            </div>
          )}

          <div className="error-boundary-actions">
            <button
              type="button"
              onClick={this.handleReload}
              className="error-boundary-btn error-boundary-btn-retry"
            >
              Tải lại trang
            </button>

            <button
              type="button"
              onClick={this.handleReset}
              className="error-boundary-btn error-boundary-btn-reload"
            >
              Phục hồi component
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export const GlobalErrorBoundary = ErrorBoundary;
export default ErrorBoundary;
