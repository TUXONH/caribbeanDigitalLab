import { signal } from '@preact/signals';
import { useTranslation } from '../i18n/useTranslation';

const isOpen = signal(false);

export default function MobileMenu() {
  const { t } = useTranslation();

  const toggle = () => {
    isOpen.value = !isOpen.value;
  };

  const close = () => {
    isOpen.value = false;
  };

  const links = [
    { href: '#services', key: 'nav.services' },
    { href: '#portfolio', key: 'nav.portfolio' },
    { href: '#about', key: 'nav.about' },
    { href: '#contact', key: 'nav.contact' },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggle}
        class="flex h-10 w-10 items-center justify-center text-white"
        aria-label="Menu"
        aria-expanded={isOpen.value}
      >
        {isOpen.value ? (
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Overlay */}
      {isOpen.value && (
        <div
          class="fixed inset-0 top-[72px] z-40 bg-navy-900/98 backdrop-blur-md"
          onClick={close}
        >
          <div class="flex flex-col items-center gap-8 pt-16">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={close}
                class="text-2xl font-semibold text-white transition-colors hover:text-gold-400"
              >
                {t(link.key)}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
