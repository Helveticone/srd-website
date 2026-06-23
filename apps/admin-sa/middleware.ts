import { NextResponse, type NextRequest } from 'next/server';
import {
  verifyAccessJwt,
  AccessAuthError,
  CF_ACCESS_JWT_HEADER,
  CF_ACCESS_COOKIE,
  SRD_EMAIL_HEADER,
  SRD_ROLE_HEADER,
  type AdminAccessConfig,
  type AdminIdentity,
} from '@srd/shared/auth';

// Configuration propre à l'admin SRD SA.
const CONFIG: AdminAccessConfig = {
  teamDomain: process.env.CF_ACCESS_TEAM_DOMAIN ?? '',
  aud: process.env.CF_ACCESS_AUD_SA ?? '',
  role: 'sa-admin',
};

function withIdentity(req: NextRequest, id: AdminIdentity) {
  const headers = new Headers(req.headers);
  headers.set(SRD_EMAIL_HEADER, id.email);
  headers.set(SRD_ROLE_HEADER, id.role);
  return NextResponse.next({ request: { headers } });
}

function deny(message: string, status: number) {
  return new NextResponse(`SRD Admin SA — ${message}`, {
    status,
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
}

export async function middleware(req: NextRequest) {
  const token =
    req.headers.get(CF_ACCESS_JWT_HEADER) ?? req.cookies.get(CF_ACCESS_COOKIE)?.value ?? null;

  // Bypass de développement local (hors production, sans Cloudflare Access).
  if (!token && process.env.NODE_ENV !== 'production' && process.env.SRD_DEV_ROLE === 'sa-admin') {
    return withIdentity(req, { email: 'dev-sa@srd.ch', role: 'sa-admin', sub: 'dev' });
  }

  if (!token) {
    return deny('Authentification Cloudflare Access requise.', 401);
  }

  try {
    const identity = await verifyAccessJwt(token, CONFIG);
    return withIdentity(req, identity);
  } catch (err) {
    const code = err instanceof AccessAuthError ? err.code : 'invalid-token';
    const status = code === 'cross-access' ? 403 : 401;
    return deny(err instanceof Error ? err.message : 'Accès refusé.', status);
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'],
};
