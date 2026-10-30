import React, { Component, ErrorInfo, ReactNode } from 'react';

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
        <div
          role="alert"
          style={{
            padding: '1.25rem',
            backgroundColor: '#fef2f2',
            border: '1px solid #f87171',
            borderRadius: '8px',
            margin: '1rem 0',
            color: '#991b1b',
            fontFamily: 'inherit',
          }}
        >
          <div style={{ marginBottom: '0.5rem' }}>
            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#b91c1c' }}>
              Sự cố hiển thị chi tiết đặt phòng (Đã bắt bởi Error Boundary)
            </h4>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#7f1d1d' }}>
              Tiến trình render của component phòng bị gián đoạn, nhưng Error Boundary đã cô lập lỗi để form đặt phòng vẫn hoạt động bình thường.
            </p>
          </div>

          {this.state.error && (
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #fecaca',
                borderRadius: '6px',
                padding: '0.5rem 0.75rem',
                margin: '0.5rem 0',
                fontSize: '0.75rem',
                fontFamily: 'Consolas, monospace',
                color: '#b91c1c',
                overflowX: 'auto',
              }}
            >
              <strong>Chi tiết lỗi:</strong> {this.state.error.toString()}
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
            <button
              type="button"
              onClick={this.handleReload}
              style={{
                padding: '0.45rem 0.9rem',
                backgroundColor: '#dc2626',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Tải lại trang
            </button>

            <button
              type="button"
              onClick={this.handleReset}
              style={{
                padding: '0.45rem 0.9rem',
                backgroundColor: '#ffffff',
                color: '#991b1b',
                border: '1px solid #f87171',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
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
