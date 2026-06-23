import { Button, Card, CardContent, Input } from '@srd/ui';
import { PageHeader } from '@/components/PageHeader';

export const metadata = { title: 'Contact' };

export default function ContactPage() {
  return (
    <>
      <PageHeader
        titre="Contact & accès"
        intro="Une question, une demande de partenariat ou de presse ? Écrivez-nous."
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2">
        {/* Coordonnées + transports */}
        <div className="space-y-6">
          <Card>
            <CardContent className="space-y-2 p-8">
              <h2 className="font-display text-xl font-black uppercase tracking-tight">SR Delémont</h2>
              <p className="text-srd-muted">Stade de la Blancherie</p>
              <p className="text-srd-muted">Route de Bâle, 2800 Delémont</p>
              <a href="mailto:info@srd.ch" className="block text-accent hover:underline">
                info@srd.ch
              </a>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-2 p-8">
              <h2 className="font-display text-xl font-black uppercase tracking-tight">Accès & transports</h2>
              <ul className="space-y-1 text-sm text-srd-muted">
                <li>🚆 Gare de Delémont à ~15 min à pied</li>
                <li>🚌 Bus urbain — arrêt Blancherie</li>
                <li>🚗 Parking visiteurs sur place</li>
              </ul>
              <a
                href="https://maps.google.com/?q=Stade+de+la+Blancherie+Delemont"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block pt-2 font-display text-sm font-bold uppercase tracking-wide text-accent hover:underline"
              >
                Itinéraire Google Maps →
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Formulaire */}
        <Card>
          <CardContent className="p-8">
            <h2 className="mb-6 font-display text-xl font-black uppercase tracking-tight">
              Nous écrire
            </h2>
            <form className="grid gap-4">
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-srd-muted">Nom</span>
                <Input placeholder="Votre nom" />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-srd-muted">E-mail</span>
                <Input type="email" placeholder="email@exemple.ch" />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-srd-muted">Message</span>
                <textarea
                  rows={5}
                  placeholder="Votre message"
                  className="flex w-full rounded-md border border-srd-border bg-srd-dark px-3 py-2 text-base text-white placeholder:text-srd-muted focus-visible:border-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                />
              </label>
              <div>
                <Button type="button">Envoyer</Button>
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
