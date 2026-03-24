import { signal, effect } from '@preact/signals';
import es from './es.json';
import en from './en.json';

export type Lang = 'es' | 'en';

const translations: Record<Lang, typeof es> = { es, en };

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'es';
  try {
    const stored = localStorage.getItem('lang');
    if (stored === 'en' || stored === 'es') return stored;
  } catch {}
  return 'es';
}

export const currentLang = signal<Lang>(getInitialLang());

// Persist to localStorage
if (typeof window !== 'undefined') {
  effect(() => {
    try {
      localStorage.setItem('lang', currentLang.value);
    } catch {}
  });
}

function getNestedValue(obj: any, path: string): string {
  const keys = path.split('.');
  let result = obj;
  for (const key of keys) {
    if (result == null) return path;
    result = result[key];
  }
  if (typeof result === 'string') return result;
  return path; // fallback: return key if not found
}

export function useTranslation() {
  const lang = currentLang.value;

  function t(key: string): string {
    const value = getNestedValue(translations[lang], key);
    if (value === key) {
      // Fallback to other language
      const fallbackLang: Lang = lang === 'es' ? 'en' : 'es';
      return getNestedValue(translations[fallbackLang], key);
    }
    return value;
  }

  function tArray(key: string): any[] {
    const keys = key.split('.');
    let result: any = translations[lang];
    for (const k of keys) {
      if (result == null) return [];
      result = result[k];
    }
    if (Array.isArray(result)) return result;
    return [];
  }

  function setLang(newLang: Lang) {
    currentLang.value = newLang;
  }

  return { t, tArray, lang, setLang };
}
