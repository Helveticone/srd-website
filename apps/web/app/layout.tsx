import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Barlow, Barlow_Condensed } from 'next/font/google';
import { GlobalHeader } from '@/components/global/GlobalHeader';
import { GlobalFooter } from '@/components/global/GlobalFooter';
import './globals.css';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-barlow',
  display: 'swap',
});

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-barlow-condensed',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'SR Delémont — Académie',
    template: '%s · SR Delémont',
  },
  description: 'Site officiel du club de football SR Delémont (Jura).',
  metadataBase: new URL('https://srd.ch'),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body className="flex min-h-screen flex-col bg-srd-black text-white">
        <GlobalHeader />
        <main className="flex-1">{children}</main>
        <GlobalFooter />
      </body>
    </html>
  );
}
