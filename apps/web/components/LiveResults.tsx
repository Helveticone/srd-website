'use client';

import { useState } from 'react';
import { cn } from '@srd/ui';
import { FOOTBALL_WIDGETS, type WidgetKey } from '@srd/shared/constants';
import { FootballWidget } from './FootballWidget';

/**
 * Section « Résultats & classements live » — onglets sur les widgets
 * football.ch. `only` restreint aux catégories d'un espace donné.
 */
export function LiveResults({ only }: { only?: WidgetKey[] }) {
  const widgets = only ? FOOTBALL_WIDGETS.filter((w) => only.includes(w.key)) : FOOTBALL_WIDGETS;
  const [active, setActive] = useState(widgets[0]!);

  return (
    <div className="space-y-6">
      {widgets.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {widgets.map((w) => (
            <button
              key={w.key}
              type="button"
              onClick={() => setActive(w)}
              className={cn(
                'rounded-full px-4 py-2 font-display text-sm font-bold uppercase tracking-wide transition-colors',
                active.key === w.key
                  ? 'bg-accent text-accent-contrast'
                  : 'border border-srd-border text-white hover:border-accent hover:text-accent',
              )}
            >
              {w.label}
            </button>
          ))}
        </div>
      )}

      <FootballWidget teamId={active.teamId} title={active.label} />

      <p className="text-xs text-srd-muted">
        Données officielles football.ch — Association Suisse de Football.
      </p>
    </div>
  );
}
