import { Button, Card, CardContent } from '@srd/ui';
import { PageHeader } from '@/components/PageHeader';

export const metadata = { title: 'Young Stars — Académie' };

const PILIERS = [
  { titre: 'Encadrement qualifié', desc: 'Des entraîneurs diplômés et un suivi individualisé.' },
  { titre: 'Détection', desc: 'Repérage et intégration des meilleurs talents régionaux.' },
  { titre: 'Double projet', desc: 'Concilier sport de haut niveau et parcours scolaire.' },
  { titre: 'Passerelle 1ère', desc: 'Un chemin clair vers l’équipe première du SRD.' },
];

export default function YoungStarsPage() {
  return (
    <>
      <PageHeader
        surtitre="Académie"
        titre="Académie Young Stars"
        intro="Le programme élite de formation des Sports-Réunis Delémont."
        image="https://srd.ch/wp-content/uploads/2024/09/7.jpg"
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {PILIERS.map((p) => (
            <Card key={p.titre}>
              <CardContent className="flex flex-col gap-2 p-8">
                <h2 className="font-display text-xl font-black uppercase tracking-tight text-accent">
                  {p.titre}
                </h2>
                <p className="text-sm text-srd-muted">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 rounded-srd border border-accent/40 bg-srd-dark p-10 text-center">
          <h3 className="font-display text-2xl font-black uppercase tracking-tight">
            Intéressé par le programme ?
          </h3>
          <p className="max-w-xl text-sm text-srd-muted">
            Les inscriptions et détections sont ouvertes pour la prochaine saison.
          </p>
          <a href="/academie/recrutement">
            <Button>Postuler à l’Académie</Button>
          </a>
        </div>
      </section>
    </>
  );
}
