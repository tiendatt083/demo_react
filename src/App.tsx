import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from './i18n/config';
import { GlobalErrorBoundary } from './components/ErrorBoundary';
import { FaultyRoomDetails } from './components/FaultyRoomDetails';
import { BookingForm } from './components/BookingForm';
import './styles/App.css';

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
    <div className="app-wrapper">
      {/* 1. Thanh chọn ngôn ngữ: Tự động đảo chiều theo LTR / RTL */}
      <nav className="lang-navbar" aria-label="Language Selector">
        <div className="lang-navbar-title">
          {t('language')}:
        </div>
        <div className="lang-buttons-group">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleLanguageChange(lang.code)}
              className={`lang-btn ${currentLang === lang.code ? 'active' : ''}`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </nav>

      {/* 2. Tiêu đề chính & Lời chào động */}
      <header className="portal-header">
        <h1 className="portal-title">
          {t('title')}
        </h1>
        <p className="portal-greeting">
          {t('dynamicGreeting', { name: 'Alex Johnson', count: 24 })}
        </p>
      </header>

      {/* 3. Form đặt phòng chính */}
      <main>
        <GlobalErrorBoundary>
          <BookingForm />
        </GlobalErrorBoundary>
      </main>

      {/* 4. Khu vực lá chắn Error Boundary & Fault Injection */}
      <section className="fault-test-card">
        <div className="fault-test-header">
          <div>
            <h3 className="fault-test-title">
              Thử nghiệm Error Boundary (Cô lập sự cố Render)
            </h3>
            <p className="fault-test-desc">
              Bấm nút bên cạnh để bơm lỗi trực tiếp vào component con nhằm kiểm chứng khả năng cô lập lỗi.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setTriggerCrash(true)}
            className="fault-btn fault-btn-crash"
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
