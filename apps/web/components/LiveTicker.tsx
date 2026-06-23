import { TICKER_RESULTS } from '@/lib/placeholder-data';

/**
 * Ticker défilant des derniers résultats / matchs en direct.
 * Marquee CSS (cf. globals.css). Données : Worker Edge football.ch (à venir).
 */
export function LiveTicker() {
  // doublé pour une boucle de défilement continue
  const items = [...TICKER_RESULTS, ...TICKER_RESULTS];

  return (
    <div className="flex items-stretch border-y border-srd-border bg-srd-dark">
      <div className="flex shrink-0 items-center gap-2 bg-srd-yellow px-4 font-display text-sm font-black uppercase tracking-wide text-srd-black">
        <span className="hidden sm:inline">Résultats</span>
        <span className="sm:hidden">Live</span>
      </div>

      <div className="group relative flex-1 overflow-hidden">
        <div className="animate-ticker flex w-max gap-8 py-3 group-hover:[animation-play-state:paused]">
          {items.map((r, i) => (
            <span key={i} className="flex items-center gap-2 whitespace-nowrap text-sm">
              <span className="font-display font-bold text-srd-yellow">{r.competition}</span>
              <span className="text-white/90">{r.domicile}</span>
              <span className="font-bold text-white">{r.score}</span>
              <span className="text-white/90">{r.exterieur}</span>
              {r.statut === 'live' && (
                <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                  Live
                </span>
              )}
              <span className="text-srd-border">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
