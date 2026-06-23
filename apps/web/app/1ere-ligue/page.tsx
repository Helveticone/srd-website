import { Badge, Button } from '@srd/ui';
import { getEntityByKey } from '@srd/shared/constants';
import { EntityHero } from '@/components/EntityHero';
import { SectionTitle } from '@/components/SectionTitle';
import { LiveResults } from '@/components/LiveResults';
import { PROCHAINS_MATCHS } from '@/lib/placeholder-data';

export const metadata = { title: '1ère Ligue' };

export default function ProHome() {
  const entity = getEntityByKey('pro');
  const next = PROCHAINS_MATCHS[0]!;

  return (
    <>
      <EntityHero
        entity={entity}
        actions={
          <>
            <a href="/1ere-ligue/abonnements">
              <Button size="lg">Billetterie & abonnements</Button>
            </a>
            <a href="/1ere-ligue/effectif">
              <Button size="lg" variant="outline">
                L’effectif
              </Button>
            </a>
          </>
        }
      />

      {/* Prochain match */}
      <section className="border-b border-srd-border bg-srd-dark/40">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="flex flex-col items-center gap-5 rounded-srd border border-accent/40 bg-srd-dark p-8 text-center">
            <Badge variant="outline" className="border-accent text-accent">
              Prochain match
            </Badge>
            <div className="flex flex-wrap items-center justify-center gap-4 font-display text-2xl font-black uppercase tracking-tight sm:text-3xl">
              <span className={next.domicile.includes('Delémont') ? 'text-accent' : 'text-white'}>
                {next.domicile}
              </span>
              <span className="text-srd-muted">—</span>
              <span className={next.exterieur.includes('Delémont') ? 'text-accent' : 'text-white'}>
                {next.exterieur}
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm text-srd-muted">
              <span>{next.date}</span>
              <span className="font-bold text-white">{next.heure}</span>
              <span>{next.lieu}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionTitle surtitre="Football.ch · Live" titre="Classement 1ère Ligue" />
        <LiveResults only={entity.widgetKeys} />
      </section>
    </>
  );
}
