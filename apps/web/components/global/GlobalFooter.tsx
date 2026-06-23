import { SrdWordmark } from '@srd/ui';
import { ENTITIES, SITE_BASELINE } from '@srd/shared/constants';

export function GlobalFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-srd-border bg-srd-dark">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="space-y-3">
          <SrdWordmark className="h-6 text-white" />
          <p className="max-w-xs text-sm text-srd-muted">{SITE_BASELINE}</p>
          <div className="space-y-1 pt-2 text-sm text-srd-muted">
            <p className="font-display font-bold uppercase text-white">Stade de la Blancherie</p>
            <p>2800 Delémont</p>
            <a href="mailto:info@srd.ch" className="block hover:text-srd-yellow">
              info@srd.ch
            </a>
          </div>
        </div>

        {/* Une colonne par espace, accentuée */}
        {ENTITIES.map((e) => (
          <nav key={e.key} data-entity={e.key} className="space-y-2">
            <a
              href={e.basePath}
              className="font-display text-sm font-black uppercase tracking-wide text-accent"
            >
              {e.label}
            </a>
            <ul className="space-y-1.5">
              {e.nav.slice(1).map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-srd-muted transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-srd-border">
        <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-srd-muted sm:px-6">
          © {year} SR Delémont — Association · SRD SA · Académie. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
