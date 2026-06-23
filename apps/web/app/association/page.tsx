import { Button, Card, CardContent } from '@srd/ui';
import { getEntityByKey } from '@srd/shared/constants';
import { EntityHero } from '@/components/EntityHero';
import { SectionTitle } from '@/components/SectionTitle';
import { LiveResults } from '@/components/LiveResults';

export const metadata = { title: 'Association' };

const SECTIONS = [
  { titre: 'Nos équipes', desc: '2e, 3e, 4e ligue, féminine et vétérans +30.', href: '/association/equipes' },
  { titre: 'Organisation', desc: 'Comité, statuts et organigramme du club.', href: '/association/organisation' },
  { titre: 'Histoire', desc: 'Plus d’un siècle de football jurassien.', href: '/association/histoire' },
  { titre: 'Fanzone', desc: 'Galerie photos, vidéos et SRD TV.', href: '/association/fanzone' },
];

export default function AssociationHome() {
  const entity = getEntityByKey('association');

  return (
    <>
      <EntityHero
        entity={entity}
        actions={
          <>
            <a href="/association/equipes">
              <Button size="lg">Nos équipes</Button>
            </a>
            <a href="/association/organisation">
              <Button size="lg" variant="outline">
                Le club
              </Button>
            </a>
          </>
        }
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionTitle surtitre="L’Association" titre="Explorer le club" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SECTIONS.map((s) => (
            <a key={s.href} href={s.href} className="group">
              <Card className="h-full transition-colors hover:border-accent">
                <CardContent className="flex flex-col gap-2 p-6">
                  <h3 className="font-display text-lg font-black uppercase tracking-tight group-hover:text-accent">
                    {s.titre}
                  </h3>
                  <p className="text-sm text-srd-muted">{s.desc}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </section>

      <section className="border-t border-srd-border bg-srd-dark/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <SectionTitle surtitre="Football.ch · Live" titre="Résultats & classements" />
          <LiveResults only={entity.widgetKeys} />
        </div>
      </section>
    </>
  );
}
