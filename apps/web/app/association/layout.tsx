import type { ReactNode } from 'react';

// Espace ASSOCIATION — accent Jaune SRD (#F5C800).
export default function AssociationLayout({ children }: { children: ReactNode }) {
  return <div data-entity="association">{children}</div>;
}
