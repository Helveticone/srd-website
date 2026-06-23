import type { ReactNode } from 'react';
import Image from 'next/image';
import { SrdWordmark } from '@srd/ui';
import type { Entity } from '@srd/shared/constants';

/**
 * Hero d'accueil d'un espace — image de l'entité, lockup accentué,
 * tagline et slot d'actions. L'accent provient du data-entity du layout parent.
 */
export function EntityHero({ entity, actions }: { entity: Entity; actions?: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-srd-black">
      <Image
        src={entity.image}
        alt={entity.label}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-srd-black via-srd-black/70 to-srd-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-srd-black/80 to-transparent" />
      {/* Liseré d'accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-5 px-4 py-20 sm:px-6 lg:py-28">
        <span className="inline-flex w-fit items-center rounded-full bg-accent px-3 py-1 font-display text-xs font-bold uppercase tracking-widest text-accent-contrast">
          {entity.label}
        </span>

        <h1 className="flex flex-wrap items-end gap-x-4 gap-y-1 leading-none">
          <SrdWordmark className="h-10 text-white sm:h-14" />
          <span className="font-display text-3xl font-black uppercase leading-none tracking-tight text-accent sm:text-5xl">
            {entity.label}
          </span>
        </h1>

        <p className="max-w-2xl font-display text-2xl font-bold uppercase leading-tight tracking-tight text-white sm:text-3xl">
          {entity.tagline}
        </p>
        <p className="max-w-xl text-base text-white/80">{entity.description}</p>

        {actions && <div className="flex flex-wrap gap-3 pt-2">{actions}</div>}
      </div>
    </section>
  );
}
