import { Button, Card, CardContent } from '@srd/ui';
import { getEntityByKey } from '@srd/shared/constants';
import { EntityHero } from '@/components/EntityHero';
import { SectionTitle } from '@/components/SectionTitle';

export const metadata = { title: 'Académie' };

const CATEGORIES = ['U8', 'U9', 'U10', 'U11', 'U12', 'U13', 'U14', 'U15', 'U16', 'U17', 'U18', 'U21'];

export default function AcademieHome() {
  const entity = getEntityByKey('academie');

  return (
    <>
      <EntityHero
        entity={entity}
        actions={
          <>
            <a href="/academie/recrutement">
              <Button size="lg">Rejoindre l’Académie</Button>
            </a>
            <a href="/academie/young-stars">
              <Button size="lg" variant="outline">
                Young Stars
              </Button>
            </a>
          </>
        }
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionTitle surtitre="Formation" titre="Catégories U8 → U21" />
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {CATEGORIES.map((c) => (
            <a
              key={c}
              href="/academie/equipes"
              className="flex items-center justify-center rounded-srd border border-srd-border bg-srd-dark py-6 font-display text-2xl font-black uppercase tracking-tight transition-colors hover:border-accent hover:text-accent"
            >
              {c}
            </a>
          ))}
        </div>
      </section>

      <section className="border-t border-srd-border bg-srd-dark/40">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-2">
          <Card className="border-accent/40">
            <CardContent className="flex flex-col gap-3 p-8">
              <h3 className="font-display text-2xl font-black uppercase tracking-tight text-accent">
                Académie Young Stars
              </h3>
              <p className="text-sm text-srd-muted">
                Le programme élite de formation des Sports-Réunis Delémont : encadrement
                professionnel, détection et accompagnement des meilleurs talents jurassiens.
              </p>
              <a href="/academie/young-stars" className="pt-2">
                <Button variant="outline">Découvrir le programme</Button>
              </a>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col gap-3 p-8">
              <h3 className="font-display text-2xl font-black uppercase tracking-tight">
                Recrutement
              </h3>
              <p className="text-sm text-srd-muted">
                Jeunes joueuses et joueurs, rejoignez le centre de formation. Détections et
                inscriptions ouvertes pour la saison à venir.
              </p>
              <a href="/academie/recrutement" className="pt-2">
                <Button>Nous rejoindre</Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
