import { Button, Card, CardContent, Input } from '@srd/ui';
import { PageHeader } from '@/components/PageHeader';

export const metadata = { title: 'Presse — 1ère Ligue' };

export default function PressePage() {
  return (
    <>
      <PageHeader
        surtitre="1ère Ligue"
        titre="Accréditations presse"
        intro="Demande d’accréditation pour les médias et professionnels couvrant les matchs du SRD."
      />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Card>
          <CardContent className="p-8">
            <h2 className="mb-1 font-display text-2xl font-black uppercase tracking-tight">
              Formulaire de demande
            </h2>
            <p className="mb-6 text-sm text-srd-muted">
              Les demandes sont à soumettre au plus tard 48h avant la rencontre.
            </p>

            <form className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-srd-muted">Média</span>
                <Input placeholder="Nom du média" />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-srd-muted">Journaliste</span>
                <Input placeholder="Prénom Nom" />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-srd-muted">E-mail</span>
                <Input type="email" placeholder="email@media.ch" />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-srd-muted">Match concerné</span>
                <Input placeholder="Ex. SRD – Bavois, 28.06" />
              </label>
              <div className="sm:col-span-2">
                <Button type="button" className="w-full sm:w-auto">
                  Envoyer la demande
                </Button>
                <p className="mt-2 text-xs text-srd-muted">
                  Formulaire de démonstration — le traitement réel sera branché ultérieurement.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 grid gap-4 sm:grid-cols-3 text-center">
          {['Presse écrite', 'Photo', 'TV / Radio'].map((t) => (
            <Card key={t}>
              <CardContent className="p-5">
                <span className="font-display font-bold uppercase tracking-wide text-accent">{t}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
