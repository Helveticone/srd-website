import { Badge, Button, Card, CardContent } from '@srd/ui';
import { PageHeader } from '@/components/PageHeader';
import { SPONSORS, NIVEAUX } from '@/lib/content/sponsors';

export const metadata = { title: 'Sponsors — 1ère Ligue' };

export default function SponsorsPage() {
  return (
    <>
      <PageHeader
        surtitre="1ère Ligue"
        titre="Sponsors & partenaires"
        intro="Ils soutiennent le SR Delémont — un grand merci à nos partenaires."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        {NIVEAUX.map((niveau) => {
          const list = SPONSORS.filter((s) => s.niveau === niveau);
          if (list.length === 0) return null;
          return (
            <div key={niveau} className="mb-10">
              <div className="mb-4 flex items-center gap-3">
                <h2 className="font-display text-xl font-black uppercase tracking-tight">{niveau}</h2>
                <span className="h-px flex-1 bg-srd-border" />
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {list.map((s) => (
                  <Card key={s.nom}>
                    <CardContent className="flex aspect-[3/2] items-center justify-center p-4 text-center">
                      <span className="font-display font-bold uppercase tracking-tight text-white/90">
                        {s.nom}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}

        <div className="mt-12 flex flex-col items-center gap-3 rounded-srd border border-accent/40 bg-srd-dark p-10 text-center">
          <Badge variant="default">Devenir partenaire</Badge>
          <h3 className="font-display text-2xl font-black uppercase tracking-tight">
            Associez votre marque au SRD
          </h3>
          <p className="max-w-xl text-sm text-srd-muted">
            Visibilité stade, panneaux LED, hospitalité : construisons un partenariat à votre image.
          </p>
          <a href="/contact">
            <Button>Demander le dossier sponsoring</Button>
          </a>
        </div>
      </section>
    </>
  );
}
