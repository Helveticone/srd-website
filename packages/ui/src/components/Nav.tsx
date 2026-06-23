'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '../lib/cn';
import { SrdLogo } from './Logo';

export interface NavItem {
  label: string;
  href: string;
}

export interface NavProps {
  items: NavItem[];
  /** Chemin courant pour surligner le lien actif */
  activePath?: string;
  /** Slot à droite (ex. bouton "Billetterie", actions admin) */
  cta?: ReactNode;
  /** Lien cible du logo (défaut "/") */
  logoHref?: string;
  /** Suffixe contextuel du lockup logo (ex. "Académie"). */
  logoSuffix?: string;
  className?: string;
}

/**
 * Barre de navigation SRD générique (lockup logo + liens + CTA, responsive).
 */
export function Nav({ items, activePath, cta, logoHref = '/', logoSuffix, className }: NavProps) {
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    activePath === href || (href !== '/' && activePath?.startsWith(href));

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-srd-border bg-srd-black/90 backdrop-blur',
        className,
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Lockup logo */}
        <SrdLogo href={logoHref} suffix={logoSuffix} />

        {/* Liens desktop */}
        <nav className="hidden items-center gap-6 lg:flex">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'font-display text-sm font-bold uppercase tracking-wide transition-colors hover:text-srd-yellow',
                isActive(item.href) ? 'text-srd-yellow' : 'text-white',
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {cta && <div className="hidden sm:block">{cta}</div>}

          {/* Toggle mobile */}
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-srd-elevated lg:hidden"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      {open && (
        <nav className="border-t border-srd-border bg-srd-black px-4 py-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'block rounded-md px-3 py-2 font-display text-base font-bold uppercase tracking-wide',
                    isActive(item.href)
                      ? 'bg-srd-elevated text-srd-yellow'
                      : 'text-white hover:bg-srd-elevated',
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          {cta && <div className="mt-4 sm:hidden">{cta}</div>}
        </nav>
      )}
    </header>
  );
}
