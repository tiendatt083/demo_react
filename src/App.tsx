import React from 'react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from './i18n/config';
import { GlobalErrorBoundary } from './components/ErrorBoundary';
import { BookingForm } from './components/BookingForm';
import { ApiErrorDemo } from './components/ApiErrorDemo';
import './styles/App.css';

export const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'vi';

  const handleLanguageChange = (code: SupportedLanguage) => {
    i18n.changeLanguage(code);
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

      {/* 4. Demo Tầng 2: Lỗi API / Network với try...catch + Async State Machine */}
      <section className="api-demo-card">
        <h3 className="api-demo-title">
          Thử nghiệm lỗi Server &amp; Mạng (try...catch + Async State Machine)
        </h3>
        <p className="api-demo-desc">
          Chọn mã phản hồi rồi bấm thanh toán. Mỗi mã lỗi có thông báo và hành động riêng, giao diện không bị sập.
        </p>
        <GlobalErrorBoundary>
          <ApiErrorDemo />
        </GlobalErrorBoundary>
      </section>
    </div>
  );
};

export default App;
