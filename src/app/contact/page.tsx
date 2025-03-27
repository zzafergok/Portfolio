'use client';

import Link from 'next/link';

import { useState, FormEvent } from 'react';

import { Send, ArrowLeft, Cat, Dog, Bird, Fish, Rabbit } from 'lucide-react';

/**
 * Contact page component that allows users to send emails
 * with a specified subject directly to the portfolio owner
 * Enhanced with subtle animal icons for visual appeal
 */
export default function Contact() {
  const [subject, setSubject] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Email recipient address
  const recipientEmail = 'gok.zaferr@gmail.com';

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!subject.trim()) {
      return; // Don't proceed if subject is empty
    }

    setIsSubmitting(true);

    // Create mailto link with the subject
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}`;

    // Open the email client
    window.location.href = mailtoLink;

    // Reset form state after short delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubject('');
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      {/* Back navigation with cat icon */}
      <Link
        href="/"
        className="inline-flex items-center mb-8 text-sm font-medium text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
      >
        <ArrowLeft size={16} className="mr-2" />
        <span>Ana Sayfaya Dön</span>
        <Cat size={16} className="ml-2 text-primary-500" />
      </Link>

      {/* Page header with subtle animal icon */}
      <div className="flex items-center mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
          İletişim
        </h1>
        <Dog
          size={24}
          className="ml-3 text-primary-400 dark:text-primary-500"
        />
      </div>

      {/* Contact form with subtle decoration */}
      <div className="relative bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 mb-8">
        {/* Decorative cat in top right corner */}
        <div className="absolute -top-4 -right-4">
          <Cat size={28} className="text-primary-500 dark:text-primary-400" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              E-posta Konusu
            </label>
            <div className="relative">
              <input
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="E-postanız için konu başlığı giriniz"
                className="w-full p-3 pl-10 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                required
              />
              <Rabbit
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !subject.trim()}
            className="inline-flex items-center justify-center py-3 px-6 rounded-md bg-primary-600 text-white font-medium transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span>Gönderiliyor...</span>
            ) : (
              <>
                <Send size={18} className="mr-2" />
                E-posta Gönder
              </>
            )}
          </button>
        </form>
      </div>

      {/* Additional contact information */}
      <div className="relative bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6">
        {/* Decorative bird in bottom right */}
        <div className="absolute -bottom-3 -right-3">
          <Bird size={24} className="text-primary-500 dark:text-primary-400" />
        </div>

        <div className="flex items-center mb-4">
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
            İletişim Bilgileri
          </h2>
          <Fish size={18} className="ml-2 text-primary-400" />
        </div>

        <p className="text-neutral-600 dark:text-neutral-400 mb-2">
          E-posta: {recipientEmail}
        </p>

        <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-4">
          E-posta göndermek için yukarıdaki formu kullanabilirsiniz. Konu
          kısmına yazdığınız metin, e-postanızın konu başlığı olacaktır.
        </p>
      </div>
    </div>
  );
}
