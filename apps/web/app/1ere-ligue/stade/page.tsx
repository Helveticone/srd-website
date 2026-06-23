import Image from 'next/image';
import { Card, CardContent } from '@srd/ui';
import { PageHeader } from '@/components/PageHeader';
import { STADE } from '@/lib/content/club';

export const metadata = { title: 'Stade — 1ère Ligue' };

export default function StadePage() {
  return (
    <>
      <PageHeader surtitre="1ère Ligue" titre="Stade de la Blancherie" image={STADE.image} />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-srd border border-srd-border">
            <Image src={STADE.image} alt={STADE.nom} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="flex flex-col justify-center gap-6">
            <div>
              <h2 className="font-display text-2xl font-black uppercase tracking-tight">{STADE.nom}</h2>
              <p className="mt-1 text-srd-muted">{STADE.adresse}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {STADE.faits.map((f) => (
                <Card key={f.label}>
                  <CardContent className="flex flex-col gap-1 p-5">
                    <span className="font-display text-sm font-bold uppercase tracking-wide text-srd-muted">
                      {f.label}
                    </span>
                    <span className="font-display text-xl font-black uppercase tracking-tight text-accent">
                      {f.valeur}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
            <a
              href="https://maps.google.com/?q=Stade+de+la+Blancherie+Delemont"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-sm font-bold uppercase tracking-wide text-accent hover:underline"
            >
              Voir l’itinéraire →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
