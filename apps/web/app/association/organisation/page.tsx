import { Button, Card, CardContent } from '@srd/ui';
import { PageHeader } from '@/components/PageHeader';
import { COMITE } from '@/lib/content/club';

export const metadata = { title: 'Organisation — Association' };

export default function OrganisationPage() {
  return (
    <>
      <PageHeader
        surtitre="Association"
        titre="Organisation"
        intro="Le comité directeur, les statuts et le fonctionnement de l’Association SR Delémont."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="mb-6 font-display text-2xl font-black uppercase tracking-tight">Le comité</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COMITE.map((m) => (
            <Card key={m.fonction}>
              <CardContent className="flex flex-col gap-1 p-6">
                <span className="font-display text-sm font-bold uppercase tracking-wide text-accent">
                  {m.fonction}
                </span>
                <span className="font-display text-lg font-black uppercase tracking-tight">
                  {m.prenom} {m.nom}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 rounded-srd border border-srd-border bg-srd-dark p-8">
          <h3 className="font-display text-xl font-black uppercase tracking-tight">Statuts & documents</h3>
          <p className="mt-2 max-w-2xl text-sm text-srd-muted">
            Les statuts de l’Association, procès-verbaux et règlements sont disponibles sur demande
            auprès du secrétariat.
          </p>
          <a href="/contact" className="mt-4 inline-block">
            <Button variant="outline">Demander les documents</Button>
          </a>
        </div>
      </section>
    </>
  );
}
