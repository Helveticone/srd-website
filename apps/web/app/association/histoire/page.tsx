import { PageHeader } from '@/components/PageHeader';
import { HISTOIRE } from '@/lib/content/club';

export const metadata = { title: 'Histoire — Association' };

export default function HistoirePage() {
  return (
    <>
      <PageHeader
        surtitre="Association"
        titre="Histoire"
        intro="Plus d’un siècle de football jurassien — des origines à la 1ère ligue."
        image="https://srd.ch/wp-content/uploads/2018/09/stade_infra_srdpresroses-copie.jpg"
      />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <ol className="relative border-l border-srd-border">
          {HISTOIRE.map((e) => (
            <li key={e.annee} className="mb-10 ml-6">
              <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-black text-accent-contrast">
                •
              </span>
              <h3 className="font-display text-2xl font-black uppercase tracking-tight text-accent">
                {e.annee}
              </h3>
              <p className="mt-1 text-white/80">{e.evenement}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
