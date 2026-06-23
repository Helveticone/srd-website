import { Button, Card, CardContent } from '@srd/ui';
import { PageHeader } from '@/components/PageHeader';
import { LOGES } from '@/lib/content/club';

export const metadata = { title: 'Loges — 1ère Ligue' };

export default function LogesPage() {
  return (
    <>
      <PageHeader
        surtitre="1ère Ligue"
        titre="Loges & hospitalité"
        intro="Vivez les matchs dans un cadre privilégié — solutions VIP et entreprises."
        image="https://srd.ch/wp-content/uploads/2024/09/7.jpg"
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {LOGES.map((l) => (
            <Card key={l.nom}>
              <CardContent className="flex h-full flex-col gap-3 p-8">
                <h2 className="font-display text-xl font-black uppercase tracking-tight text-accent">
                  {l.nom}
                </h2>
                <p className="text-sm text-srd-muted">{l.capacite}</p>
                <ul className="flex flex-1 flex-col gap-2 text-sm text-white/80">
                  {l.prestations.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 rounded-srd border border-accent/40 bg-srd-dark p-10 text-center">
          <h3 className="font-display text-2xl font-black uppercase tracking-tight">
            Demande d’hospitalité
          </h3>
          <p className="max-w-xl text-sm text-srd-muted">
            Notre équipe commerciale vous accompagne pour composer une formule sur mesure.
          </p>
          <a href="/contact">
            <Button>Nous contacter</Button>
          </a>
        </div>
      </section>
    </>
  );
}
