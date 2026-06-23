/* ==========================================================================
   Authentification admin — Cloudflare Access (JWT) + rôles cloisonnés.

   Cloudflare Access place un JWT signé dans le header
   `Cf-Access-Jwt-Assertion` (et le cookie `CF_Authorization`).
   On le vérifie contre le JWKS de l'équipe, en exigeant l'`aud` PROPRE
   à l'application → un jeton d'un autre admin est automatiquement rejeté
   (blocage d'accès croisé). Le rôle est ensuite affirmé strictement.
   ========================================================================== */
import { createRemoteJWKSet, jwtVerify, type JWTPayload } from 'jose';

export type AdminRole = 'assoc-admin' | 'sa-admin';

/** En-tête injecté par Cloudflare Access. */
export const CF_ACCESS_JWT_HEADER = 'cf-access-jwt-assertion';
/** Cookie de session Cloudflare Access. */
export const CF_ACCESS_COOKIE = 'CF_Authorization';

/** En-têtes internes propagés par le middleware vers l'app. */
export const SRD_EMAIL_HEADER = 'x-srd-user-email';
export const SRD_ROLE_HEADER = 'x-srd-user-role';

export interface AdminAccessConfig {
  /** Domaine d'équipe, ex. "srd.cloudflareaccess.com". */
  teamDomain: string;
  /** AUD tag de l'application Access (unique par admin). */
  aud: string;
  /** Rôle attendu pour cette application. */
  role: AdminRole;
}

export interface AdminIdentity {
  email: string;
  role: AdminRole;
  sub: string;
}

export type AccessErrorCode = 'no-token' | 'invalid-token' | 'cross-access' | 'misconfigured';

export class AccessAuthError extends Error {
  constructor(
    public readonly code: AccessErrorCode,
    message: string,
  ) {
    super(message);
    this.name = 'AccessAuthError';
  }
}

/** Cache des JWKS par domaine d'équipe (clés mises en cache par jose). */
const jwksCache = new Map<string, ReturnType<typeof createRemoteJWKSet>>();

function getJwks(teamDomain: string) {
  let jwks = jwksCache.get(teamDomain);
  if (!jwks) {
    jwks = createRemoteJWKSet(new URL(`https://${teamDomain}/cdn-cgi/access/certs`));
    jwksCache.set(teamDomain, jwks);
  }
  return jwks;
}

/**
 * Vérifie un JWT Cloudflare Access et renvoie l'identité admin.
 * Lève AccessAuthError si invalide, expiré, mauvais `aud` (accès croisé)
 * ou rôle incohérent.
 */
export async function verifyAccessJwt(
  token: string,
  config: AdminAccessConfig,
): Promise<AdminIdentity> {
  if (!config.teamDomain || !config.aud) {
    throw new AccessAuthError(
      'misconfigured',
      'CF_ACCESS_TEAM_DOMAIN ou AUD manquant pour cette application.',
    );
  }

  let payload: JWTPayload;
  try {
    ({ payload } = await jwtVerify(token, getJwks(config.teamDomain), {
      issuer: `https://${config.teamDomain}`,
      audience: config.aud, // ← cœur du cloisonnement : un autre admin a un autre aud
    }));
  } catch (err) {
    throw new AccessAuthError(
      'invalid-token',
      `JWT Cloudflare Access invalide : ${(err as Error).message}`,
    );
  }

  const email = typeof payload.email === 'string' ? payload.email : '';

  // Rôle : si un claim custom est présent, il DOIT correspondre au rôle de
  // l'app — toute divergence est traitée comme une tentative d'accès croisé.
  const custom = (payload.custom ?? {}) as Record<string, unknown>;
  const claimRole = (custom.role ?? (payload as Record<string, unknown>).role) as
    | string
    | undefined;
  if (claimRole && claimRole !== config.role) {
    throw new AccessAuthError(
      'cross-access',
      `Rôle « ${claimRole} » interdit sur l'espace « ${config.role} ».`,
    );
  }

  return {
    email,
    role: config.role,
    sub: typeof payload.sub === 'string' ? payload.sub : '',
  };
}

/** Lit l'identité propagée par le middleware (en-têtes internes). */
export function readIdentityFromHeaders(headers: Headers): AdminIdentity | null {
  const email = headers.get(SRD_EMAIL_HEADER);
  const role = headers.get(SRD_ROLE_HEADER);
  if (!email || (role !== 'assoc-admin' && role !== 'sa-admin')) return null;
  return { email, role, sub: '' };
}
