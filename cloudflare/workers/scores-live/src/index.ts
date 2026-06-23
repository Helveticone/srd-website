/**
 * SRD — Worker Edge API : scores football.ch live
 * Placeholder — l'implémentation complète (fetch + cache KV) arrive
 * dans une étape ultérieure.
 */
export interface Env {
  FOOTBALL_CH_BASE: string;
  CACHE_TTL_SECONDS: string;
}

export default {
  async fetch(_request: Request, _env: Env): Promise<Response> {
    return new Response(JSON.stringify({ ok: true, service: 'srd-scores-live' }), {
      headers: { 'content-type': 'application/json' },
    });
  },
};
