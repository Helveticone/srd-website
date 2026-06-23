import type { ReactNode } from 'react';

// Espace ACADÉMIE — accent Lime (#A3E635).
export default function AcademieLayout({ children }: { children: ReactNode }) {
  return <div data-entity="academie">{children}</div>;
}
