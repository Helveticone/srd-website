/* ==========================================================================
   Schéma SRD SA — géré par la direction (admin.pro.srd.ch).
   Équipe 1ère (effectif + staff), sponsors, contrats, loges, stade,
   actualités 1ère ligue, SRD TV, accréditations presse.
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

export const posteJoueur = pgEnum('poste_joueur', [
  'gardien',
  'defenseur',
  'milieu',
  'attaquant',
]);

export const niveauSponsor = pgEnum('niveau_sponsor', [
  'principal',
  'or',
  'argent',
  'bronze',
  'partenaire',
  'media',
]);

export const statutContrat = pgEnum('statut_contrat', [
  'actif',
  'expire',
  'negociation',
  'resilie',
]);

export const statutLoge = pgEnum('statut_loge', ['libre', 'reservee', 'occupee', 'maintenance']);

export const statutAccreditation = pgEnum('statut_accreditation', [
  'demande',
  'acceptee',
  'refusee',
]);

export const typeAcces = pgEnum('type_acces', ['presse', 'photo', 'tv', 'radio']);

/** Effectif de l'équipe 1ère. */
export const equipePremiere = pgTable(
  'sa_equipe_premiere',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    prenom: text('prenom').notNull(),
    nom: text('nom').notNull(),
    poste: posteJoueur('poste').notNull(),
    numero: integer('numero'),
    dateNaissance: date('date_naissance'),
    nationalite: text('nationalite'),
    tailleCm: integer('taille_cm'),
    poidsKg: integer('poids_kg'),
    photoUrl: text('photo_url'),
    dateArrivee: date('date_arrivee'),
    contratJusqu: date('contrat_jusqu'),
    actif: boolean('actif').notNull().default(true),
    ordre: integer('ordre').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index('idx_premiere_poste').on(t.poste)],
);

/** Staff technique de l'équipe 1ère. */
export const staffPremiere = pgTable('sa_staff_premiere', {
  id: uuid('id').primaryKey().defaultRandom(),
  prenom: text('prenom').notNull(),
  nom: text('nom').notNull(),
  fonction: text('fonction').notNull(),
  photoUrl: text('photo_url'),
  ordre: integer('ordre').notNull().default(0),
  actif: boolean('actif').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

/** Sponsors & partenaires. */
export const sponsors = pgTable(
  'sa_sponsors',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    nom: text('nom').notNull(),
    niveau: niveauSponsor('niveau').notNull().default('partenaire'),
    logoUrl: text('logo_url'),
    siteWeb: text('site_web'),
    description: text('description'),
    ordre: integer('ordre').notNull().default(0),
    actif: boolean('actif').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index('idx_sponsors_niveau').on(t.niveau)],
);

/** Contrats de sponsoring (rattachés à un sponsor). */
export const contrats = pgTable(
  'sa_contrats',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    sponsorId: uuid('sponsor_id')
      .notNull()
      .references(() => sponsors.id, { onDelete: 'cascade' }),
    montant: numeric('montant', { precision: 12, scale: 2 }),
    dateDebut: date('date_debut'),
    dateFin: date('date_fin'),
    type: text('type'),
    conditions: text('conditions'),
    statut: statutContrat('statut').notNull().default('negociation'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index('idx_contrats_sponsor').on(t.sponsorId)],
);

/** Loges VIP du stade. */
export const loges = pgTable('sa_loges', {
  id: uuid('id').primaryKey().defaultRandom(),
  nom: text('nom').notNull(),
  numero: text('numero'),
  capacite: integer('capacite'),
  prixSaison: numeric('prix_saison', { precision: 10, scale: 2 }),
  statut: statutLoge('statut').notNull().default('libre'),
  titulaire: text('titulaire'),
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

/** Informations du stade (config, généralement une seule ligne active). */
export const stadeInfos = pgTable('sa_stade_infos', {
  id: uuid('id').primaryKey().defaultRandom(),
  nom: text('nom').notNull(),
  adresse: text('adresse'),
  capacite: integer('capacite'),
  capaciteAssises: integer('capacite_assises'),
  capaciteDebout: integer('capacite_debout'),
  surface: text('surface'),
  description: text('description'),
  actif: boolean('actif').notNull().default(true),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

/** Actualités de l'équipe 1ère / SRD SA. */
export const actualitesSa = pgTable(
  'sa_actualites',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    titre: text('titre').notNull(),
    slug: text('slug').notNull().unique(),
    chapo: text('chapo'),
    contenu: text('contenu').notNull(),
    imageUrl: text('image_url'),
    categorie: text('categorie'),
    publie: boolean('publie').notNull().default(false),
    datePublication: timestamp('date_publication', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index('idx_actu_sa_publie').on(t.publie, t.datePublication)],
);

/** SRD TV — vidéos. */
export const srdTvVideos = pgTable('sa_srd_tv', {
  id: uuid('id').primaryKey().defaultRandom(),
  titre: text('titre').notNull(),
  description: text('description'),
  videoUrl: text('video_url').notNull(),
  thumbnailUrl: text('thumbnail_url'),
  dureeSecondes: integer('duree_secondes'),
  categorie: text('categorie'),
  publie: boolean('publie').notNull().default(false),
  datePublication: timestamp('date_publication', { withTimezone: true }),
  ordre: integer('ordre').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

/** Accréditations presse. */
export const accreditations = pgTable(
  'sa_accreditations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    media: text('media').notNull(),
    journaliste: text('journaliste').notNull(),
    email: text('email'),
    telephone: text('telephone'),
    typeAcces: typeAcces('type_acces').notNull().default('presse'),
    dateMatch: timestamp('date_match', { withTimezone: true }),
    statut: statutAccreditation('statut').notNull().default('demande'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index('idx_accred_statut').on(t.statut)],
);

export type Joueur = typeof equipePremiere.$inferSelect;
export type NewJoueur = typeof equipePremiere.$inferInsert;
export type StaffMembre = typeof staffPremiere.$inferSelect;
export type Sponsor = typeof sponsors.$inferSelect;
export type NewSponsor = typeof sponsors.$inferInsert;
export type Contrat = typeof contrats.$inferSelect;
export type Loge = typeof loges.$inferSelect;
export type StadeInfo = typeof stadeInfos.$inferSelect;
export type ActualiteSa = typeof actualitesSa.$inferSelect;
export type SrdTvVideo = typeof srdTvVideos.$inferSelect;
export type Accreditation = typeof accreditations.$inferSelect;
