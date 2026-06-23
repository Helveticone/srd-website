import { Card, CardContent } from '@srd/ui';
import { PageHeader } from '@/components/PageHeader';

export const metadata = { title: 'Staff — Académie' };

const STAFF = [
  { fonction: 'Responsable de la formation', prenom: 'à', nom: 'définir' },
  { fonction: 'Coordinateur technique', prenom: 'à', nom: 'définir' },
  { fonction: 'Responsable des gardiens', prenom: 'à', nom: 'définir' },
  { fonction: 'Responsable détection', prenom: 'à', nom: 'définir' },
  { fonction: 'Préparateur physique juniors', prenom: 'à', nom: 'définir' },
  { fonction: 'Référent scolaire', prenom: 'à', nom: 'définir' },
];

export default function StaffPage() {
  return (
    <>
      <PageHeader
        surtitre="Académie"
        titre="Encadrement"
        intro="L’équipe technique qui accompagne nos juniors au quotidien."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STAFF.map((s) => (
            <Card key={s.fonction}>
              <CardContent className="flex flex-col gap-1 p-6">
                <span className="font-display text-sm font-bold uppercase tracking-wide text-accent">
                  {s.fonction}
                </span>
                <span className="font-display text-lg font-black uppercase tracking-tight">
                  {s.prenom} {s.nom}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
