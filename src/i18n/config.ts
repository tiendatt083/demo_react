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

// Đảm bảo cấu trúc giao diện luôn cố định LTR (trái sang phải) cho tất cả ngôn ngữ
if (typeof document !== 'undefined') {
  document.documentElement.dir = 'ltr';
  document.documentElement.lang = i18n.language || 'vi';
}

i18n.on('languageChanged', (lng: string) => {
  if (typeof document !== 'undefined') {
    document.documentElement.dir = 'ltr'; // Giữ nguyên hướng LTR, không đảo cấu trúc
    document.documentElement.lang = lng;
  }
});

export default i18n;
