import React, { useState } from 'react';
import '../styles/ApiErrorDemo.css';

/** Async State Machine: tại một thời điểm chỉ ở đúng 1 trạng thái */
export type AsyncStatus = 'idle' | 'loading' | 'error' | 'success';

type AsyncState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; message: string }
  | { status: 'error'; code: number | 'NETWORK'; message: string; action: string };

type Scenario = 200 | 400 | 401 | 402 | 409 | 500 | 'offline';

const SCENARIOS: { value: Scenario; label: string }[] = [
  { value: 200, label: '200 OK' },
  { value: 400, label: '400 Bad Request' },
  { value: 401, label: '401 Unauthorized' },
  { value: 402, label: '402 Hết tiền' },
  { value: 409, label: '409 Conflict' },
  { value: 500, label: '500 Server Error' },
  { value: 'offline', label: 'Rớt mạng' },
];

const MOCK_LATENCY_MS = 1200;

/** Lỗi HTTP mang theo status code để tầng UI quyết định phản hồi */
class HttpError extends Error {
  constructor(public readonly status: number) {
    super(`HTTP ${status}`);
  }
}

/**
 * API giả lập: trả về Response thật với status code chọn trước.
 * 'offline' ném TypeError giống hệt fetch() khi mất kết nối.
 */
const mockPaymentApi = (scenario: Scenario): Promise<Response> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (scenario === 'offline') {
        reject(new TypeError('Failed to fetch'));
        return;
      }
      resolve(new Response(JSON.stringify({ ok: scenario === 200 }), { status: scenario }));
    }, MOCK_LATENCY_MS);
  });

/** Actionable Feedback: mỗi mã lỗi -> thông báo + hành động cụ thể cho người dùng */
const toErrorState = (error: unknown): Extract<AsyncState, { status: 'error' }> => {
  if (error instanceof HttpError) {
    switch (error.status) {
      case 400:
        return { status: 'error', code: 400, message: 'Dữ liệu đặt phòng không hợp lệ.', action: 'Kiểm tra lại các trường trong form.' };
      case 401:
        return { status: 'error', code: 401, message: 'Phiên đăng nhập đã hết hạn.', action: 'Đăng nhập lại để tiếp tục.' };
      case 402:
        return { status: 'error', code: 402, message: 'Số dư tài khoản không đủ để thanh toán.', action: 'Nạp thêm tiền hoặc đổi phương thức thanh toán.' };
      case 409:
        return { status: 'error', code: 409, message: 'Phòng đã bị người khác đặt trước.', action: 'Chọn ngày hoặc phòng khác.' };
      default:
        return { status: 'error', code: error.status, message: 'Máy chủ đang gặp sự cố.', action: 'Thử lại sau ít phút.' };
    }
  }
  return { status: 'error', code: 'NETWORK', message: 'Mất kết nối mạng.', action: 'Kiểm tra Wi-Fi / 4G rồi bấm thử lại.' };
};

export const ApiErrorDemo: React.FC = () => {
  const [scenario, setScenario] = useState<Scenario>(402);
  const [state, setState] = useState<AsyncState>({ status: 'idle' });
  // Dùng để đẩy lỗi async vào Error Boundary (throw trong render)
  const [fatalError, setFatalError] = useState<Error | null>(null);

  if (fatalError) {
    throw fatalError;
  }

  const handlePay = async () => {
    setState({ status: 'loading' });
    try {
      const res = await mockPaymentApi(scenario);
      if (!res.ok) {
        // fetch KHÔNG tự reject với 4xx/5xx -> phải tự ném
        throw new HttpError(res.status);
      }
      setState({ status: 'success', message: 'Thanh toán thành công. Mã đặt phòng: GS-2026-0042' });
    } catch (error) {
      console.error('[ApiErrorDemo]', error);
      setState(toErrorState(error));
    }
  };

  const handleEscalate = async () => {
    try {
      await mockPaymentApi(500);
      // ponytail: luôn trả 500, chỉ để minh họa đường đi của lỗi
      throw new HttpError(500);
    } catch (error) {
      // Error Boundary không bắt lỗi Promise -> lưu vào state để ném lại khi render
      setFatalError(error instanceof Error ? error : new Error(String(error)));
    }
  };

  const isLoading = state.status === 'loading';

  return (
    <div className="api-demo">
      <fieldset className="api-scenarios">
        <legend className="api-scenarios-legend">Chọn phản hồi server giả lập:</legend>
        <div className="api-scenarios-group">
          {SCENARIOS.map(({ value, label }) => (
            <button
              key={label}
              type="button"
              aria-pressed={value === scenario}
              disabled={isLoading}
              onClick={() => setScenario(value)}
              className={`api-scenario-btn ${value === scenario ? 'active' : ''}`}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="api-actions">
        <button type="button" onClick={handlePay} disabled={isLoading} className="api-pay-btn">
          {isLoading ? 'Đang gọi API...' : 'Thanh toán đặt phòng'}
        </button>
        <span className="api-status">
          status: <strong className={`api-status-${state.status}`}>'{state.status}'</strong>
        </span>
      </div>

      <div aria-live="polite">
        {state.status === 'success' && (
          <div role="status" className="api-banner api-banner-success">
            {state.message}
          </div>
        )}

        {state.status === 'error' && (
          <div role="alert" className="api-banner api-banner-error">
            <strong>[{state.code}] {state.message}</strong>
            <div className="api-banner-hint">Gợi ý: {state.action}</div>
            <button type="button" onClick={handlePay} className="api-retry-btn">
              Thử lại
            </button>
          </div>
        )}
      </div>

      <button type="button" onClick={handleEscalate} className="api-escalate-btn">
        Đẩy lỗi async vào Error Boundary
      </button>
    </div>
  );
};

export default ApiErrorDemo;
