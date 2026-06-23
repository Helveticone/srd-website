import { headers } from 'next/headers';
import { readIdentityFromHeaders, type AdminIdentity } from '@srd/shared/auth';

/**
 * Identité admin courante (propagée par le middleware).
 * À utiliser dans les Server Components / Route Handlers.
 */
export async function getAdminIdentity(): Promise<AdminIdentity | null> {
  const h = await headers();
  return readIdentityFromHeaders(h);
}
