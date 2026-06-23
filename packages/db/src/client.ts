import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schemaAssoc from './schema-assoc';
import * as schemaSa from './schema-sa';
import * as schemaShared from './schema-shared';

export const schema = { ...schemaAssoc, ...schemaSa, ...schemaShared };
export type Schema = typeof schema;
export type Database = PostgresJsDatabase<Schema>;

let _db: Database | undefined;
let _client: ReturnType<typeof postgres> | undefined;

/**
 * Singleton de connexion Drizzle (postgres-js).
 * Initialisé paresseusement pour ne pas exiger DATABASE_URL au build.
 */
export function getDb(): Database {
  if (_db) return _db;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('[@srd/db] DATABASE_URL est manquante.');
  }

  _client = postgres(connectionString, { prepare: false });
  _db = drizzle(_client, { schema });
  return _db;
}
