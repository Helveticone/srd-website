'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button, SrdLogo, cn } from '@srd/ui';
import { ENTITIES, getEntityFromPath } from '@srd/shared/constants';

/**
 * En-tête global persistant : lockup dynamique + switcher des 3 espaces
 * (niveau 1) et sous-navigation de l'espace courant (niveau 2).
 * L'attribut data-entity active l'accent de l'espace courant.
 */
export function GlobalHeader() {
  const pathname = usePathname();
  const entity = getEntityFromPath(pathname);
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === entity?.basePath
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      data-entity={entity?.key}
      className="sticky top-0 z-50 w-full border-b border-srd-border bg-srd-black/90 backdrop-blur"
    >
      {/* Niveau 1 — lockup + switcher */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <SrdLogo
          href="/"
          suffix={entity?.label}
          suffixClassName={entity ? 'text-accent' : 'text-srd-yellow'}
        />

        <nav className="hidden items-center gap-1 md:flex">
          {ENTITIES.map((e) => (
            <a
              key={e.key}
              href={e.basePath}
              data-entity={e.key}
              className={cn(
                'rounded-full px-4 py-2 font-display text-sm font-bold uppercase tracking-wide transition-colors',
                entity?.key === e.key
                  ? 'bg-accent text-accent-contrast'
                  : 'text-white hover:text-srd-yellow',
              )}
            >
              {e.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="/1ere-ligue/abonnements" className="hidden sm:block">
            <Button size="sm">Billetterie</Button>
          </a>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-srd-elevated md:hidden"
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

      {/* Niveau 2 — sous-nav de l'espace courant (desktop) */}
      {entity && (
        <div className="border-t border-srd-border/60 bg-srd-dark/40">
          <div className="mx-auto hidden max-w-7xl items-center gap-6 overflow-x-auto px-4 py-2.5 sm:px-6 lg:flex">
            {entity.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  'whitespace-nowrap font-display text-sm font-bold uppercase tracking-wide transition-colors',
                  isActive(item.href) ? 'text-accent' : 'text-white/70 hover:text-white',
                )}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Mobile — switcher + sous-nav */}
      {open && (
        <div className="border-t border-srd-border bg-srd-black px-4 py-4 lg:hidden">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-srd-muted">Espaces</p>
          <div className="mb-4 flex flex-col gap-1">
            {ENTITIES.map((e) => (
              <a
                key={e.key}
                href={e.basePath}
                data-entity={e.key}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-md px-3 py-2 font-display text-base font-bold uppercase tracking-wide',
                  entity?.key === e.key ? 'bg-accent text-accent-contrast' : 'text-white hover:bg-srd-elevated',
                )}
              >
                {e.label}
              </a>
            ))}
          </div>

          {entity && (
            <>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-srd-muted">
                {entity.label}
              </p>
              <div className="flex flex-col gap-1">
                {entity.nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'rounded-md px-3 py-2 font-display text-sm font-bold uppercase tracking-wide',
                      isActive(item.href) ? 'text-accent' : 'text-white/80 hover:bg-srd-elevated',
                    )}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </>
          )}

          <a href="/1ere-ligue/abonnements" onClick={() => setOpen(false)} className="mt-4 block sm:hidden">
            <Button size="sm" className="w-full">
              Billetterie
            </Button>
          </a>
        </div>
      )}
    </header>
  );
}
