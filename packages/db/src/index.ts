// @srd/db — connexion + schémas Drizzle SR Delémont
export { getDb, schema, type Database, type Schema } from './client';

// Schémas (import nominal possible via les sous-chemins du package aussi)
export * as schemaAssoc from './schema-assoc';
export * as schemaSa from './schema-sa';
export * as schemaShared from './schema-shared';

// Ré-export des tables + types les plus utilisés
export * from './schema-shared';
export * from './schema-assoc';
export * from './schema-sa';
