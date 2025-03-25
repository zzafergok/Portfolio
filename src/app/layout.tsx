import type { Metadata } from 'next';

import DashboardLayout from '@/components/layout/DashboardLayout';

import '@/styles/globals.css';

// Metadata for SEO
export const metadata: Metadata = {
  title: 'Zafer Gök',
  description:
    'Next.js, TypeScript ve Tailwind CSS ile oluşturulmuş kişisel portfolio sitesi',
  keywords: [
    'redux',
    'nextjs',
    'reactjs',
    'portfolio',
    'frontend',
    'tailwind',
    'typescript',
    'web developer',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <DashboardLayout>
          <div className="container mx-auto">{children}</div>
        </DashboardLayout>
      </body>
    </html>
  );
}
