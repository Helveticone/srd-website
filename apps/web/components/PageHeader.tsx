import Image from 'next/image';

/**
 * En-tête de sous-page (accent hérité du data-entity du layout parent).
 * Avec image optionnelle en fond.
 */
export function PageHeader({
  surtitre,
  titre,
  intro,
  image,
}: {
  surtitre?: string;
  titre: string;
  intro?: string;
  image?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-srd-border bg-srd-black">
      {image && (
        <>
          <Image
            src={image}
            alt={titre}
            fill
            sizes="100vw"
            className="object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-srd-black via-srd-black/80 to-srd-black/40" />
        </>
      )}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        {surtitre && (
          <span className="font-display text-sm font-bold uppercase tracking-widest text-accent">
            {surtitre}
          </span>
        )}
        <h1 className="mt-1 font-display text-4xl font-black uppercase tracking-tight sm:text-5xl">
          {titre}
        </h1>
        {intro && <p className="mt-4 max-w-2xl text-base text-white/70 sm:text-lg">{intro}</p>}
      </div>
    </section>
  );
}
