import { Badge, Card, CardContent } from '@srd/ui';
import { PageHeader } from '@/components/PageHeader';
import { ACADEMIE_CATEGORIES } from '@/lib/content/teams';

export const metadata = { title: 'Équipes — Académie' };

export default function AcademieEquipesPage() {
  return (
    <>
      <PageHeader
        surtitre="Académie"
        titre="Catégories U8 → U21"
        intro="Un parcours de formation complet, de l’éveil au football jusqu’à la passerelle vers la première équipe."
        image="https://srd.ch/wp-content/uploads/2023/07/AdobeStock_359545570.jpeg"
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ACADEMIE_CATEGORIES.map((c) => (
            <Card key={c.code}>
              <CardContent className="flex items-center gap-4 p-6">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-srd border border-accent font-display text-2xl font-black text-accent">
                  {c.code}
                </span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold uppercase tracking-tight">{c.tranche}</span>
                    {c.youngStars && <Badge variant="default">Young Stars</Badge>}
                  </div>
                  <span className="text-sm text-srd-muted">{c.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
