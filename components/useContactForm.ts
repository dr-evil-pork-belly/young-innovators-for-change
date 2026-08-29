'use client';

import { useState } from 'react';

/**
 * Shared submit logic for every form on the site.
 *
 * The important property: `submitted` only becomes true when the server has
 * actually accepted the message. A failure surfaces as `error` rather than a
 * false confirmation.
 */
export function useContactForm<T extends Record<string, string>>(
  initial: T,
  formName: string,
  page: string,
) {
  const [form, setForm]           = useState<T>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);
  /** honeypot, hidden from people, filled by bots */
  const [trap, setTrap]           = useState('');

  const handle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formName, page, fields: form, company_website: trap }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? 'Something went wrong. Please try again.');
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { form, setForm, handle, submit, submitted, loading, error, trap, setTrap };
}
