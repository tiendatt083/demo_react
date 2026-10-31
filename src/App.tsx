import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from './i18n/config';
import { GlobalErrorBoundary } from './components/ErrorBoundary';
import { FaultyRoomDetails } from './components/FaultyRoomDetails';
import { BookingForm } from './components/BookingForm';

export const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'vi';

  // Trạng thái Fault Injection để kiểm thử Error Boundary
  const [triggerCrash, setTriggerCrash] = useState<boolean>(false);
  const [faultBoundaryKey, setFaultBoundaryKey] = useState<number>(0);

  const handleLanguageChange = (code: SupportedLanguage) => {
    i18n.changeLanguage(code);
  };

  const handleResetFault = () => {
    setTriggerCrash(false);
    setFaultBoundaryKey((prev) => prev + 1);
  };

  return (
    <div
      style={{
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '2rem 1rem',
        maxWidth: '860px',
        margin: '0 auto',
        color: '#1f2937',
        textAlign: 'start', // Tự động căn theo start (trái với VI/EN, phải với ZH-RTL)
      }}
    >
      {/* 1. Thanh chọn ngôn ngữ: Tự động đảo chiều theo LTR / RTL */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          padding: '0.75rem 1rem',
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ fontWeight: 600, color: '#374151', fontSize: '0.9rem' }}>
          {t('language')}:
        </div>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleLanguageChange(lang.code)}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                border: currentLang === lang.code ? '1.5px solid #2563eb' : '1px solid #d1d5db',
                backgroundColor: currentLang === lang.code ? '#eff6ff' : '#ffffff',
                color: currentLang === lang.code ? '#1d4ed8' : '#4b5563',
                fontWeight: currentLang === lang.code ? 600 : 500,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Tiêu đề chính & Lời chào động */}
      <header style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ color: '#1e3a8a', margin: '0 0 0.4rem 0', fontSize: '1.75rem', fontWeight: 700 }}>
          {t('title')}
        </h1>
        <p style={{ color: '#059669', fontWeight: 500, margin: 0, fontSize: '0.95rem' }}>
          {t('dynamicGreeting', { name: 'Alex Johnson', count: 24 })}
        </p>
      </header>

      {/* 3. Form đặt phòng chính */}
      <main style={{ marginBottom: '1.5rem' }}>
        <GlobalErrorBoundary>
          <BookingForm />
        </GlobalErrorBoundary>
      </main>

      {/* 4. Khu vực lá chắn Error Boundary & Fault Injection */}
      <section
        style={{
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '1.25rem',
          backgroundColor: '#f8fafc',
          marginBottom: '1.5rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.5rem',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <div>
            <h3 style={{ margin: 0, color: '#334155', fontSize: '1rem', fontWeight: 600 }}>
              Thử nghiệm Error Boundary (Cô lập sự cố Render)
            </h3>
            <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>
              Bấm nút bên cạnh để bơm lỗi trực tiếp vào component con nhằm kiểm chứng khả năng cô lập lỗi.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setTriggerCrash(true)}
            style={{
              backgroundColor: '#dc2626',
              color: '#ffffff',
              padding: '0.45rem 0.9rem',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease',
            }}
          >
            {t('buttons.testCrash')}
          </button>
        </div>

        {/* Component ErrorBoundary bao bọc FaultyRoomDetails */}
        <GlobalErrorBoundary key={faultBoundaryKey} onReset={handleResetFault}>
          <FaultyRoomDetails triggerCrash={triggerCrash} />
        </GlobalErrorBoundary>
      </section>
    </div>
  );
};

export default App;
