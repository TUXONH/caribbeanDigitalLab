import { useState } from 'preact/hooks';
import { useTranslation } from '../i18n/useTranslation';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (form: FormData): Record<string, string> => {
    const errs: Record<string, string> = {};
    const name = (form.get('name') as string)?.trim();
    const email = (form.get('email') as string)?.trim();
    const message = (form.get('message') as string)?.trim();

    if (!name) errs.name = 'Required';
    if (!email) errs.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Invalid email';
    if (!message) errs.message = 'Required';

    return errs;
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus('sending');

    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        body: form,
      });

      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} class="rounded-xl border border-navy-900/5 bg-white p-8 shadow-sm" noValidate>
      {/* Honeypot */}
      <div class="absolute -left-[9999px]" aria-hidden="true">
        <input type="text" name="_honeypot" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Name */}
      <div class="mb-6">
        <label for="name" class="mb-2 block text-sm font-medium text-navy-900">
          {t('contact.form.name')} *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          class={`w-full rounded-lg border bg-white px-4 py-3 text-navy-900 outline-none transition-colors focus:border-gold-500 focus:ring-1 focus:ring-gold-500 ${errors.name ? 'border-red-400' : 'border-navy-900/10'}`}
        />
        {errors.name && <p class="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

      {/* Email */}
      <div class="mb-6">
        <label for="email" class="mb-2 block text-sm font-medium text-navy-900">
          {t('contact.form.email')} *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          class={`w-full rounded-lg border bg-white px-4 py-3 text-navy-900 outline-none transition-colors focus:border-gold-500 focus:ring-1 focus:ring-gold-500 ${errors.email ? 'border-red-400' : 'border-navy-900/10'}`}
        />
        {errors.email && <p class="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div class="mb-6">
        <label for="phone" class="mb-2 block text-sm font-medium text-navy-900">
          {t('contact.form.phone')}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          class="w-full rounded-lg border border-navy-900/10 bg-white px-4 py-3 text-navy-900 outline-none transition-colors focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
        />
      </div>

      {/* Message */}
      <div class="mb-6">
        <label for="message" class="mb-2 block text-sm font-medium text-navy-900">
          {t('contact.form.message')} *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          class={`w-full resize-none rounded-lg border bg-white px-4 py-3 text-navy-900 outline-none transition-colors focus:border-gold-500 focus:ring-1 focus:ring-gold-500 ${errors.message ? 'border-red-400' : 'border-navy-900/10'}`}
        />
        {errors.message && <p class="mt-1 text-sm text-red-500">{errors.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'sending'}
        class="w-full rounded-lg bg-gold-500 px-8 py-4 font-semibold text-navy-900 shadow-lg shadow-gold-500/25 transition-all hover:bg-gold-400 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'sending' ? t('contact.form.sending') : t('contact.form.submit')}
      </button>

      {/* Feedback */}
      {status === 'success' && (
        <div class="mt-4 rounded-lg bg-green-50 p-4 text-sm text-green-700">
          {t('contact.form.success')}
        </div>
      )}
      {status === 'error' && (
        <div class="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {t('contact.form.error')}
        </div>
      )}
    </form>
  );
}
