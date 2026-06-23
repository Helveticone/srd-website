import Image from 'next/image';
import { Badge } from '@srd/ui';
import { PageHeader } from '@/components/PageHeader';
import { GALLERY } from '@/lib/content/news';

export const metadata = { title: 'Fanzone — Association' };

export default function FanzonePage() {
  return (
    <>
      <PageHeader
        surtitre="Association"
        titre="Fanzone"
        intro="Galerie photos, vidéos et SRD TV — la vie du club côté supporters."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="mb-6 font-display text-2xl font-black uppercase tracking-tight">Galerie</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {GALLERY.map((src, i) => (
            <div key={i} className="relative aspect-square overflow-hidden rounded-srd border border-srd-border">
              <Image src={src} alt={`Photo ${i + 1}`} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover transition-transform duration-500 hover:scale-110" />
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 rounded-srd border border-accent/40 bg-srd-dark p-10 text-center">
          <Badge variant="default">SRD TV</Badge>
          <h3 className="font-display text-2xl font-black uppercase tracking-tight">Bientôt en ligne</h3>
          <p className="max-w-xl text-sm text-srd-muted">
            Résumés de matchs, interviews et coulisses du club — la chaîne vidéo des Sports-Réunis
            Delémont arrive prochainement.
          </p>
        </div>
      </section>
    </>
  );
}
