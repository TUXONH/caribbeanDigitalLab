import { currentLang, type Lang } from '../i18n/useTranslation';

export default function LanguageToggle() {
  const lang = currentLang.value;

  const toggle = () => {
    currentLang.value = lang === 'es' ? 'en' : 'es';
  };

  return (
    <button
      onClick={toggle}
      class="flex items-center gap-1 rounded-full border border-white/20 px-3 py-1.5 text-sm font-medium text-white transition-all hover:border-gold-500 hover:text-gold-400"
      aria-label="Toggle language"
    >
      <span class={lang === 'es' ? 'font-bold text-gold-400' : 'opacity-60'}>ES</span>
      <span class="opacity-40">|</span>
      <span class={lang === 'en' ? 'font-bold text-gold-400' : 'opacity-60'}>EN</span>
    </button>
  );
}
