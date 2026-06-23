import { Card, CardContent } from '@srd/ui';
import { PageHeader } from '@/components/PageHeader';
import { PREMIERE_SQUAD, PREMIERE_STAFF, POSTES } from '@/lib/content/squad';

export const metadata = { title: 'Effectif — 1ère Ligue' };

export default function EffectifPage() {
  return (
    <>
      <PageHeader
        surtitre="1ère Ligue"
        titre="Effectif"
        intro="Les joueuses et joueurs de la première équipe et leur encadrement technique."
        image="https://srd.ch/wp-content/uploads/2024/09/DSC0021.jpg"
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        {POSTES.map((poste) => (
          <div key={poste} className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-black uppercase tracking-tight text-accent">
              {poste}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {PREMIERE_SQUAD.filter((p) => p.poste === poste).map((p) => (
                <Card key={p.numero}>
                  <CardContent className="flex items-center gap-4 p-4">
                    <span className="font-display text-3xl font-black tabular-nums text-srd-muted">
                      {p.numero}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-display font-bold uppercase tracking-tight">
                        {p.prenom} {p.nom}
                      </p>
                      <p className="text-sm text-srd-muted">{p.nationalite}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        <h2 className="mb-4 mt-4 font-display text-2xl font-black uppercase tracking-tight text-accent">
          Staff
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PREMIERE_STAFF.map((s) => (
            <Card key={s.fonction}>
              <CardContent className="flex flex-col gap-1 p-5">
                <span className="font-display text-sm font-bold uppercase tracking-wide text-srd-muted">
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
