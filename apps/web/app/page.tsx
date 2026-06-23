import Image from 'next/image';
import { Badge, Button, Card, CardContent, SrdWordmark } from '@srd/ui';
import { ENTITIES, getEntityByKey } from '@srd/shared/constants';
import { LiveTicker } from '@/components/LiveTicker';
import { SectionTitle } from '@/components/SectionTitle';
import { PROCHAINS_MATCHS, ACTUALITES } from '@/lib/placeholder-data';

export default function HubPage() {
  const nextPro = PROCHAINS_MATCHS[0]!;

  return (
    <>
      {/* HERO HUB — 3 portes d'entrée */}
      <section className="relative isolate overflow-hidden bg-srd-black">
        <Image
          src="https://srd.ch/wp-content/uploads/2024/09/DSC0021.jpg"
          alt="SR Delémont"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-srd-black/60 via-srd-black/80 to-srd-black" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
          <div className="mb-12 flex flex-col items-center gap-4 text-center">
            <SrdWordmark className="h-12 text-white sm:h-16" />
            <p className="font-display text-xl font-bold uppercase tracking-tight text-white/80 sm:text-2xl">
              Un club, trois passions
            </p>
            <p className="max-w-xl text-sm text-white/60 sm:text-base">
              Choisissez votre espace — l’Association historique, la première équipe en 1ère ligue,
              ou l’Académie de formation.
            </p>
          </div>

          {/* Cartes entités */}
          <div className="grid gap-5 md:grid-cols-3">
            {ENTITIES.map((e) => (
              <a
                key={e.key}
                href={e.basePath}
                data-entity={e.key}
                className="group relative flex flex-col overflow-hidden rounded-srd border border-srd-border bg-srd-dark transition-all hover:-translate-y-1 hover:border-accent"
              >
                <div className="h-1.5 w-full bg-accent" />
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={e.image}
                    alt={e.label}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-srd-dark via-srd-dark/30 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-6">
                  <span className="font-display text-2xl font-black uppercase leading-none tracking-tight text-accent">
                    {e.label}
                  </span>
                  <span className="font-display text-sm font-bold uppercase tracking-wide text-white">
                    {e.tagline}
                  </span>
                  <p className="text-sm text-srd-muted">{e.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1 font-display text-sm font-bold uppercase tracking-wide text-accent">
                    Entrer
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <LiveTicker />

      {/* PROCHAIN MATCH 1ÈRE LIGUE — mis en avant */}
      <section data-entity="pro" className="border-b border-srd-border bg-srd-dark/40">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="flex flex-col items-center gap-6 rounded-srd border border-accent/40 bg-srd-dark p-8 text-center">
            <Badge variant="outline" className="border-accent text-accent">
              Prochain match · 1ère Ligue
            </Badge>
            <div className="flex flex-wrap items-center justify-center gap-4 font-display text-2xl font-black uppercase tracking-tight sm:text-4xl">
              <span className={nextPro.domicile.includes('Delémont') ? 'text-accent' : 'text-white'}>
                {nextPro.domicile}
              </span>
              <span className="text-srd-muted">—</span>
              <span className={nextPro.exterieur.includes('Delémont') ? 'text-accent' : 'text-white'}>
                {nextPro.exterieur}
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm text-srd-muted">
              <span>{nextPro.date}</span>
              <span className="font-bold text-white">{nextPro.heure}</span>
              <span>{nextPro.lieu}</span>
            </div>
            <a href="/1ere-ligue/abonnements">
              <Button>Réserver ma place</Button>
            </a>
          </div>
        </div>
      </section>

      {/* ACTUALITÉS AGRÉGÉES (3 espaces) */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionTitle surtitre="Toutes les actus" titre="Dernières actualités" />
        <div className="grid gap-6 md:grid-cols-3">
          {ACTUALITES.map((a, i) => {
            const entity = getEntityByKey(a.entity);
            return (
              <a key={i} href={a.href} data-entity={entity.key} className="group">
                <Card className="h-full overflow-hidden transition-colors hover:border-accent">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={a.imageUrl}
                      alt={a.titre}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-3 top-3">
                      <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 font-display text-xs font-bold uppercase tracking-wide text-accent-contrast">
                        {a.categorie}
                      </span>
                    </div>
                  </div>
                  <CardContent className="flex flex-col gap-2 p-5">
                    <span className="text-xs text-srd-muted">{a.date}</span>
                    <h3 className="font-display text-xl font-black uppercase leading-tight tracking-tight group-hover:text-accent">
                      {a.titre}
                    </h3>
                    <p className="text-sm text-srd-muted">{a.chapo}</p>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>
      </section>
    </>
  );
}
