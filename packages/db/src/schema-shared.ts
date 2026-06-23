/* ==========================================================================
   Schéma PARTAGÉ — lecture seule pour les deux admins.
   Résultats, calendrier et classements de toutes les équipes.
   Alimenté par le Worker Edge (football.ch) + saisie manuelle.
   ========================================================================== */
import {
  pgTable,
  pgEnum,
  uuid,
  text,
  integer,
  timestamp,
  boolean,
  index,
} from 'drizzle-orm/pg-core';

/** Catégories d'équipe (mappées aux widgets football.ch). */
export const categorieEquipe = pgEnum('categorie_equipe', [
  '1ere',
  '2e',
  '3e',
  '4e',
  'feminine',
  'seniors30',
  'juniors',
]);

export const statutMatch = pgEnum('statut_match', ['a_venir', 'en_cours', 'termine', 'reporte']);

/** Calendrier des matchs (toutes équipes). */
export const calendrier = pgTable(
  'shared_calendrier',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    categorie: categorieEquipe('categorie').notNull(),
    competition: text('competition'),
    domicile: text('domicile').notNull(),
    exterieur: text('exterieur').notNull(),
    dateMatch: timestamp('date_match', { withTimezone: true }).notNull(),
    lieu: text('lieu'),
    statut: statutMatch('statut').notNull().default('a_venir'),
    scoreDomicile: integer('score_domicile'),
    scoreExterieur: integer('score_exterieur'),
    /** ID widget football.ch source (ex. t-35976). */
    widgetId: text('widget_id'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    index('idx_calendrier_categorie').on(t.categorie),
    index('idx_calendrier_date').on(t.dateMatch),
  ],
);

/** Résultats finalisés (référence un match du calendrier). */
export const resultats = pgTable(
  'shared_resultats',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    matchId: uuid('match_id')
      .notNull()
      .references(() => calendrier.id, { onDelete: 'cascade' }),
    scoreDomicile: integer('score_domicile').notNull(),
    scoreExterieur: integer('score_exterieur').notNull(),
    miTempsDomicile: integer('mi_temps_domicile'),
    miTempsExterieur: integer('mi_temps_exterieur'),
    finalise: boolean('finalise').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index('idx_resultats_match').on(t.matchId)],
);

/** Classements par catégorie / saison. */
export const classements = pgTable(
  'shared_classements',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    categorie: categorieEquipe('categorie').notNull(),
    saison: text('saison').notNull(),
    rang: integer('rang').notNull(),
    equipe: text('equipe').notNull(),
    joues: integer('joues').notNull().default(0),
    gagnes: integer('gagnes').notNull().default(0),
    nuls: integer('nuls').notNull().default(0),
    perdus: integer('perdus').notNull().default(0),
    butsPour: integer('buts_pour').notNull().default(0),
    butsContre: integer('buts_contre').notNull().default(0),
    difference: integer('difference').notNull().default(0),
    points: integer('points').notNull().default(0),
    widgetId: text('widget_id'),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index('idx_classements_cat_saison').on(t.categorie, t.saison)],
);

export type Calendrier = typeof calendrier.$inferSelect;
export type NewCalendrier = typeof calendrier.$inferInsert;
export type Resultat = typeof resultats.$inferSelect;
export type Classement = typeof classements.$inferSelect;
