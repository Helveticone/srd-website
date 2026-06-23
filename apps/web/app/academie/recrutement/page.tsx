import { Button, Card, CardContent, Input } from '@srd/ui';
import { PageHeader } from '@/components/PageHeader';

export const metadata = { title: 'Recrutement — Académie' };

export default function RecrutementPage() {
  return (
    <>
      <PageHeader
        surtitre="Académie"
        titre="Rejoindre l’Académie"
        intro="Jeunes joueuses et joueurs, tentez votre chance lors des détections du centre de formation."
      />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Card>
          <CardContent className="p-8">
            <h2 className="mb-1 font-display text-2xl font-black uppercase tracking-tight">
              Demande de détection
            </h2>
            <p className="mb-6 text-sm text-srd-muted">
              Remplissez ce formulaire ; le responsable formation reviendra vers vous.
            </p>
            <form className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-srd-muted">Prénom du joueur</span>
                <Input placeholder="Prénom" />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-srd-muted">Nom du joueur</span>
                <Input placeholder="Nom" />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-srd-muted">Année de naissance</span>
                <Input placeholder="Ex. 2014" />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-srd-muted">Catégorie souhaitée</span>
                <Input placeholder="Ex. U12" />
              </label>
              <label className="flex flex-col gap-1 text-sm sm:col-span-2">
                <span className="text-srd-muted">E-mail du responsable légal</span>
                <Input type="email" placeholder="email@exemple.ch" />
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
      </section>
    </>
  );
}
