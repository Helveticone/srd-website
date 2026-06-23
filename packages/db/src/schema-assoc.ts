/* ==========================================================================
   Schéma ASSOCIATION — géré par le comité (admin.srd.ch).
   Membres, juniors, comité, actualités, documents, cotisations, équipes
   (toutes sauf la 1ère, qui relève de SRD SA).
   ========================================================================== */
import {
  pgTable,
  pgEnum,
  uuid,
  text,
  integer,
  numeric,
  timestamp,
  boolean,
  date,
  index,
} from 'drizzle-orm/pg-core';

export const typeMembre = pgEnum('type_membre', [
  'actif',
  'passif',
  'honoraire',
  'junior',
  'supporter',
]);

export const statutCotisation = pgEnum('statut_cotisation', ['paye', 'impaye', 'en_retard']);

export const categorieJunior = pgEnum('categorie_junior', [
  'U8',
  'U9',
  'U10',
  'U11',
  'U12',
  'U13',
  'U14',
  'U15',
  'U16',
  'U17',
  'U18',
  'U19',
  'U21',
]);

export const typeDocument = pgEnum('type_document', [
  'statuts',
  'pv',
  'reglement',
  'formulaire',
  'autre',
]);

/** Membres de l'Association. */
export const membres = pgTable(
  'assoc_membres',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    prenom: text('prenom').notNull(),
    nom: text('nom').notNull(),
    email: text('email'),
    telephone: text('telephone'),
    adresse: text('adresse'),
    npa: text('npa'),
    localite: text('localite'),
    dateNaissance: date('date_naissance'),
    typeMembre: typeMembre('type_membre').notNull().default('actif'),
    dateAdhesion: date('date_adhesion'),
    actif: boolean('actif').notNull().default(true),
    notes: text('notes'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index('idx_membres_nom').on(t.nom), index('idx_membres_type').on(t.typeMembre)],
);

/** Cotisations rattachées à un membre. */
export const cotisations = pgTable(
  'assoc_cotisations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    membreId: uuid('membre_id')
      .notNull()
      .references(() => membres.id, { onDelete: 'cascade' }),
    saison: text('saison').notNull(),
    montant: numeric('montant', { precision: 10, scale: 2 }).notNull(),
    statut: statutCotisation('statut').notNull().default('impaye'),
    datePaiement: date('date_paiement'),
    methodePaiement: text('methode_paiement'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index('idx_cotisations_membre').on(t.membreId), index('idx_cotisations_saison').on(t.saison)],
);

/** Juniors (U8 → U21) + Académie Young Stars. */
export const juniors = pgTable(
  'assoc_juniors',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    prenom: text('prenom').notNull(),
    nom: text('nom').notNull(),
    dateNaissance: date('date_naissance'),
    categorie: categorieJunior('categorie').notNull(),
    equipe: text('equipe'),
    numeroLicence: text('numero_licence'),
    responsableLegal: text('responsable_legal'),
    contactUrgence: text('contact_urgence'),
    academieYoungStars: boolean('academie_young_stars').notNull().default(false),
    actif: boolean('actif').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index('idx_juniors_categorie').on(t.categorie)],
);

/** Membres du comité directeur. */
export const comite = pgTable('assoc_comite', {
  id: uuid('id').primaryKey().defaultRandom(),
  prenom: text('prenom').notNull(),
  nom: text('nom').notNull(),
  fonction: text('fonction').notNull(),
  email: text('email'),
  telephone: text('telephone'),
  photoUrl: text('photo_url'),
  ordre: integer('ordre').notNull().default(0),
  actif: boolean('actif').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

/** Actualités de l'Association. */
export const actualitesAssoc = pgTable(
  'assoc_actualites',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    titre: text('titre').notNull(),
    slug: text('slug').notNull().unique(),
    chapo: text('chapo'),
    contenu: text('contenu').notNull(),
    imageUrl: text('image_url'),
    auteur: text('auteur'),
    categorie: text('categorie'),
    publie: boolean('publie').notNull().default(false),
    datePublication: timestamp('date_publication', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index('idx_actu_assoc_publie').on(t.publie, t.datePublication)],
);

/** Documents (statuts, PV, règlements, formulaires). */
export const documents = pgTable('assoc_documents', {
  id: uuid('id').primaryKey().defaultRandom(),
  titre: text('titre').notNull(),
  description: text('description'),
  fichierUrl: text('fichier_url').notNull(),
  type: typeDocument('type').notNull().default('autre'),
  public: boolean('public').notNull().default(false),
  tailleOctets: integer('taille_octets'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

/** Équipes actives gérées par l'Association (2e, 3e, 4e, féminine, +30…). */
export const equipesAssoc = pgTable('assoc_equipes', {
  id: uuid('id').primaryKey().defaultRandom(),
  nom: text('nom').notNull(),
  categorie: text('categorie').notNull(),
  description: text('description'),
  photoUrl: text('photo_url'),
  entraineurPrincipal: text('entraineur_principal'),
  entraineurAdjoint: text('entraineur_adjoint'),
  widgetId: text('widget_id'),
  ordre: integer('ordre').notNull().default(0),
  actif: boolean('actif').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export type Membre = typeof membres.$inferSelect;
export type NewMembre = typeof membres.$inferInsert;
export type Cotisation = typeof cotisations.$inferSelect;
export type Junior = typeof juniors.$inferSelect;
export type MembreComite = typeof comite.$inferSelect;
export type ActualiteAssoc = typeof actualitesAssoc.$inferSelect;
export type NewActualiteAssoc = typeof actualitesAssoc.$inferInsert;
export type Document = typeof documents.$inferSelect;
export type EquipeAssoc = typeof equipesAssoc.$inferSelect;
