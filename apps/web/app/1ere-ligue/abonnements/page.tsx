import { Badge, Button, Card, CardContent } from '@srd/ui';
import { PageHeader } from '@/components/PageHeader';
import { ABONNEMENTS } from '@/lib/content/club';

export const metadata = { title: 'Abonnements — 1ère Ligue' };

export default function AbonnementsPage() {
  return (
    <>
      <PageHeader
        surtitre="1ère Ligue"
        titre="Billetterie & abonnements"
        intro="Places à l’unité, abonnements de saison et formules supporters au Stade de la Blancherie."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {ABONNEMENTS.map((a) => (
            <Card
              key={a.nom}
              className={a.highlight ? 'border-accent' : undefined}
            >
              <CardContent className="flex h-full flex-col gap-4 p-8">
                {a.highlight && (
                  <Badge variant="default" className="w-fit">
                    Le plus populaire
                  </Badge>
                )}
                <h2 className="font-display text-xl font-black uppercase tracking-tight">{a.nom}</h2>
                <p className="font-display text-4xl font-black tracking-tight text-accent">{a.prix}</p>
                <ul className="flex flex-1 flex-col gap-2 text-sm text-srd-muted">
                  {a.avantages.map((av) => (
                    <li key={av} className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      {av}
                    </li>
                  ))}
                </ul>
                <Button variant={a.highlight ? 'primary' : 'outline'} className="w-full">
                  Choisir
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-srd-muted">
          Pour les loges et l’hospitalité d’entreprise, consultez la page{' '}
          <a href="/1ere-ligue/loges" className="text-accent hover:underline">
            Loges
          </a>
          .
        </p>
      </section>
    </>
  );
}
