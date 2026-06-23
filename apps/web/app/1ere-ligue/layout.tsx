import type { ReactNode } from 'react';

// Espace 1ÈRE LIGUE (SRD SA) — accent Argent (#C0C5CE).
export default function ProLayout({ children }: { children: ReactNode }) {
  return <div data-entity="pro">{children}</div>;
}
