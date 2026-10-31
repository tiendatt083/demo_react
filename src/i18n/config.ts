import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import viTranslation from './locales/vi.json';
import enTranslation from './locales/en.json';
import zhTranslation from './locales/zh.json';

export const SUPPORTED_LANGUAGES = [
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文 (简体)' },
] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]['code'];

const resources = {
  vi: { translation: viTranslation },
  en: { translation: enTranslation },
  zh: { translation: zhTranslation },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'vi', // Ngôn ngữ mặc định
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false, // React đã tự sanitize XSS
    },
  });

// Tự động đảo chiều RTL (180 độ từ phải sang trái) khi chọn tiếng Trung theo kịch bản Slide 18
if (typeof document !== 'undefined') {
  document.documentElement.dir = i18n.language === 'zh' ? 'rtl' : 'ltr';
  document.documentElement.lang = i18n.language || 'vi';
}

i18n.on('languageChanged', (lng: string) => {
  if (typeof document !== 'undefined') {
    // Khi chọn 'zh' (tiếng Trung), lật giao diện sang RTL (phải sang trái) để demo
    document.documentElement.dir = lng === 'zh' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
  }
});

export default i18n;
