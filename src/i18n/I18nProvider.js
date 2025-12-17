import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from './translations';

const STORAGE_KEY = 'odr_lang';

const I18nContext = createContext(null);

function detectDefaultLang() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'fr') return saved;
  } catch {
    // ignore
  }
  const navLang = (typeof navigator !== 'undefined' && navigator.language) || 'en';
  return String(navLang).toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

function getByPath(obj, path) {
  return String(path)
    .split('.')
    .reduce((acc, key) => (acc && typeof acc === 'object' ? acc[key] : undefined), obj);
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(detectDefaultLang);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
    document.documentElement.lang = lang;
  }, [lang]);

  const api = useMemo(() => {
    const dict = translations[lang] || translations.en;
    const t = (key) => {
      const value = getByPath(dict, key);
      if (typeof value === 'string') return value;
      const fallback = getByPath(translations.en, key);
      return typeof fallback === 'string' ? fallback : String(key);
    };
    const toggleLang = () => setLang((current) => (current === 'fr' ? 'en' : 'fr'));
    return { lang, setLang, toggleLang, t };
  }, [lang]);

  return <I18nContext.Provider value={api}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

