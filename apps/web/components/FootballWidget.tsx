import { footballWidgetUrl } from '@srd/shared/constants';

/**
 * Embed officiel d'un widget football.ch (iframe).
 * Source du format relevée sur srd.ch : Widgets.aspx/v-1233/t-XXXXX/a-trr/
 */
export function FootballWidget({
  teamId,
  title,
  height = 760,
}: {
  teamId: string;
  title: string;
  height?: number;
}) {
  return (
    <iframe
      src={footballWidgetUrl(teamId)}
      title={`Résultats & classement — ${title}`}
      loading="lazy"
      scrolling="yes"
      className="w-full rounded-srd border border-srd-border bg-white"
      style={{ height, maxHeight: height }}
    />
  );
}
