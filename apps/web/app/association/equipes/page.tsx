import Image from 'next/image';
import { Badge, Card, CardContent } from '@srd/ui';
import { PageHeader } from '@/components/PageHeader';
import { ASSOCIATION_TEAMS } from '@/lib/content/teams';

export const metadata = { title: 'Équipes — Association' };

export default function EquipesPage() {
  return (
    <>
      <PageHeader
        surtitre="Association"
        titre="Nos équipes"
        intro="Toutes les équipes actives du club : réserve, juniors adultes, féminine et vétérans."
        image="https://srd.ch/wp-content/uploads/2024/09/7.jpg"
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {ASSOCIATION_TEAMS.map((t) => (
            <Card key={t.nom} className="overflow-hidden">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image src={t.image} alt={t.nom} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover opacity-80" />
                <div className="absolute left-3 top-3">
                  <Badge variant="default">{t.categorie}</Badge>
                </div>
              </div>
              <CardContent className="flex flex-col gap-2 p-6">
                <h2 className="font-display text-2xl font-black uppercase tracking-tight">{t.nom}</h2>
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  <dt className="text-srd-muted">Ligue</dt>
                  <dd className="text-right font-medium">{t.ligue}</dd>
                  <dt className="text-srd-muted">Entraîneur</dt>
                  <dd className="text-right font-medium">{t.entraineur}</dd>
                </dl>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
