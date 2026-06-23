import { Badge } from '@srd/ui';
import { PageHeader } from '@/components/PageHeader';
import { LiveResults } from '@/components/LiveResults';
import { PROCHAINS_MATCHS } from '@/lib/placeholder-data';

export const metadata = { title: 'Matchs — 1ère Ligue' };

export default function MatchsPage() {
  return (
    <>
      <PageHeader
        surtitre="1ère Ligue"
        titre="Matchs & résultats"
        intro="Calendrier, résultats et classement officiels de la première équipe."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="mb-6 font-display text-2xl font-black uppercase tracking-tight">
          Prochaines rencontres
        </h2>
        <div className="mb-12 divide-y divide-srd-border overflow-hidden rounded-srd border border-srd-border">
          {PROCHAINS_MATCHS.map((m, i) => (
            <div key={i} className="flex flex-wrap items-center justify-between gap-3 bg-srd-dark p-4">
              <div className="flex items-center gap-3">
                <Badge variant="muted">{m.competition}</Badge>
                <span className="text-sm text-srd-muted">
                  {m.date} · {m.heure}
                </span>
              </div>
              <div className="font-display font-bold uppercase tracking-tight">
                <span className={m.domicile.includes('Delémont') ? 'text-accent' : ''}>{m.domicile}</span>
                <span className="px-2 text-srd-muted">—</span>
                <span className={m.exterieur.includes('Delémont') ? 'text-accent' : ''}>{m.exterieur}</span>
              </div>
              <span className="text-sm text-srd-muted">{m.lieu}</span>
            </div>
          ))}
        </div>

        <h2 className="mb-6 font-display text-2xl font-black uppercase tracking-tight">
          Classement officiel
        </h2>
        <LiveResults only={['1ere']} />
      </section>
    </>
  );
}
