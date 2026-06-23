import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Barlow, Barlow_Condensed } from 'next/font/google';
import { AdminShell } from '@/components/AdminShell';
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
  title: 'Admin Association — SR Delémont',
  description: 'Interface d’administration du comité de l’Association SR Delémont.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body className="bg-srd-black text-white">
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
