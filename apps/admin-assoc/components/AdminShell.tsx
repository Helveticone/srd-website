'use client';

import { useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Badge, SrdWordmark, cn } from '@srd/ui';
import { ADMIN_ASSOC_NAV } from '@srd/shared/constants';

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const SidebarLinks = () => (
    <nav className="flex flex-col gap-1">
      {ADMIN_ASSOC_NAV.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={() => setOpen(false)}
          className={cn(
            'rounded-md px-3 py-2 font-display text-sm font-bold uppercase tracking-wide transition-colors',
            isActive(item.href)
              ? 'bg-srd-yellow text-srd-black'
              : 'text-white hover:bg-srd-elevated',
          )}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-srd-black text-white">
      {/* Sidebar desktop */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-srd-border bg-srd-dark p-4 lg:flex">
        <div className="mb-6 flex flex-col gap-2 px-1">
          <SrdWordmark className="h-6 text-white" />
          <Badge variant="default">Association</Badge>
        </div>
        <SidebarLinks />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b border-srd-border bg-srd-black/90 px-4 backdrop-blur lg:px-8">
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-srd-elevated lg:hidden"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
            </svg>
          </button>
          <div className="flex items-center gap-2 lg:hidden">
            <SrdWordmark className="h-5 text-white" />
            <span className="font-display text-sm font-black uppercase text-srd-yellow">Assoc</span>
          </div>
          <div className="ml-auto text-sm text-srd-muted">admin.srd.ch</div>
        </header>

        {/* Drawer mobile */}
        {open && (
          <div className="border-b border-srd-border bg-srd-dark p-4 lg:hidden">
            <SidebarLinks />
          </div>
        )}

        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
