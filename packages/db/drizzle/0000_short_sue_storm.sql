CREATE TYPE "public"."categorie_junior" AS ENUM('U8', 'U9', 'U10', 'U11', 'U12', 'U13', 'U14', 'U15', 'U16', 'U17', 'U18', 'U19', 'U21');--> statement-breakpoint
CREATE TYPE "public"."statut_cotisation" AS ENUM('paye', 'impaye', 'en_retard');--> statement-breakpoint
CREATE TYPE "public"."type_document" AS ENUM('statuts', 'pv', 'reglement', 'formulaire', 'autre');--> statement-breakpoint
CREATE TYPE "public"."type_membre" AS ENUM('actif', 'passif', 'honoraire', 'junior', 'supporter');--> statement-breakpoint
CREATE TYPE "public"."niveau_sponsor" AS ENUM('principal', 'or', 'argent', 'bronze', 'partenaire', 'media');--> statement-breakpoint
CREATE TYPE "public"."poste_joueur" AS ENUM('gardien', 'defenseur', 'milieu', 'attaquant');--> statement-breakpoint
CREATE TYPE "public"."statut_accreditation" AS ENUM('demande', 'acceptee', 'refusee');--> statement-breakpoint
CREATE TYPE "public"."statut_contrat" AS ENUM('actif', 'expire', 'negociation', 'resilie');--> statement-breakpoint
CREATE TYPE "public"."statut_loge" AS ENUM('libre', 'reservee', 'occupee', 'maintenance');--> statement-breakpoint
CREATE TYPE "public"."type_acces" AS ENUM('presse', 'photo', 'tv', 'radio');--> statement-breakpoint
CREATE TYPE "public"."categorie_equipe" AS ENUM('1ere', '2e', '3e', '4e', 'feminine', 'seniors30', 'juniors');--> statement-breakpoint
CREATE TYPE "public"."statut_match" AS ENUM('a_venir', 'en_cours', 'termine', 'reporte');--> statement-breakpoint
CREATE TABLE "assoc_actualites" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"titre" text NOT NULL,
	"slug" text NOT NULL,
	"chapo" text,
	"contenu" text NOT NULL,
	"image_url" text,
	"auteur" text,
	"categorie" text,
	"publie" boolean DEFAULT false NOT NULL,
	"date_publication" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "assoc_actualites_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "assoc_comite" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"prenom" text NOT NULL,
	"nom" text NOT NULL,
	"fonction" text NOT NULL,
	"email" text,
	"telephone" text,
	"photo_url" text,
	"ordre" integer DEFAULT 0 NOT NULL,
	"actif" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "assoc_cotisations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"membre_id" uuid NOT NULL,
	"saison" text NOT NULL,
	"montant" numeric(10, 2) NOT NULL,
	"statut" "statut_cotisation" DEFAULT 'impaye' NOT NULL,
	"date_paiement" date,
	"methode_paiement" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "assoc_documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"titre" text NOT NULL,
	"description" text,
	"fichier_url" text NOT NULL,
	"type" "type_document" DEFAULT 'autre' NOT NULL,
	"public" boolean DEFAULT false NOT NULL,
	"taille_octets" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "assoc_equipes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nom" text NOT NULL,
	"categorie" text NOT NULL,
	"description" text,
	"photo_url" text,
	"entraineur_principal" text,
	"entraineur_adjoint" text,
	"widget_id" text,
	"ordre" integer DEFAULT 0 NOT NULL,
	"actif" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "assoc_juniors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"prenom" text NOT NULL,
	"nom" text NOT NULL,
	"date_naissance" date,
	"categorie" "categorie_junior" NOT NULL,
	"equipe" text,
	"numero_licence" text,
	"responsable_legal" text,
	"contact_urgence" text,
	"academie_young_stars" boolean DEFAULT false NOT NULL,
	"actif" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "assoc_membres" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"prenom" text NOT NULL,
	"nom" text NOT NULL,
	"email" text,
	"telephone" text,
	"adresse" text,
	"npa" text,
	"localite" text,
	"date_naissance" date,
	"type_membre" "type_membre" DEFAULT 'actif' NOT NULL,
	"date_adhesion" date,
	"actif" boolean DEFAULT true NOT NULL,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sa_accreditations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"media" text NOT NULL,
	"journaliste" text NOT NULL,
	"email" text,
	"telephone" text,
	"type_acces" "type_acces" DEFAULT 'presse' NOT NULL,
	"date_match" timestamp with time zone,
	"statut" "statut_accreditation" DEFAULT 'demande' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sa_actualites" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"titre" text NOT NULL,
	"slug" text NOT NULL,
	"chapo" text,
	"contenu" text NOT NULL,
	"image_url" text,
	"categorie" text,
	"publie" boolean DEFAULT false NOT NULL,
	"date_publication" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "sa_actualites_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "sa_contrats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sponsor_id" uuid NOT NULL,
	"montant" numeric(12, 2),
	"date_debut" date,
	"date_fin" date,
	"type" text,
	"conditions" text,
	"statut" "statut_contrat" DEFAULT 'negociation' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sa_equipe_premiere" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"prenom" text NOT NULL,
	"nom" text NOT NULL,
	"poste" "poste_joueur" NOT NULL,
	"numero" integer,
	"date_naissance" date,
	"nationalite" text,
	"taille_cm" integer,
	"poids_kg" integer,
	"photo_url" text,
	"date_arrivee" date,
	"contrat_jusqu" date,
	"actif" boolean DEFAULT true NOT NULL,
	"ordre" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sa_loges" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nom" text NOT NULL,
	"numero" text,
	"capacite" integer,
	"prix_saison" numeric(10, 2),
	"statut" "statut_loge" DEFAULT 'libre' NOT NULL,
	"titulaire" text,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sa_sponsors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nom" text NOT NULL,
	"niveau" "niveau_sponsor" DEFAULT 'partenaire' NOT NULL,
	"logo_url" text,
	"site_web" text,
	"description" text,
	"ordre" integer DEFAULT 0 NOT NULL,
	"actif" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sa_srd_tv" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"titre" text NOT NULL,
	"description" text,
	"video_url" text NOT NULL,
	"thumbnail_url" text,
	"duree_secondes" integer,
	"categorie" text,
	"publie" boolean DEFAULT false NOT NULL,
	"date_publication" timestamp with time zone,
	"ordre" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sa_stade_infos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nom" text NOT NULL,
	"adresse" text,
	"capacite" integer,
	"capacite_assises" integer,
	"capacite_debout" integer,
	"surface" text,
	"description" text,
	"actif" boolean DEFAULT true NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sa_staff_premiere" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"prenom" text NOT NULL,
	"nom" text NOT NULL,
	"fonction" text NOT NULL,
	"photo_url" text,
	"ordre" integer DEFAULT 0 NOT NULL,
	"actif" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shared_calendrier" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"categorie" "categorie_equipe" NOT NULL,
	"competition" text,
	"domicile" text NOT NULL,
	"exterieur" text NOT NULL,
	"date_match" timestamp with time zone NOT NULL,
	"lieu" text,
	"statut" "statut_match" DEFAULT 'a_venir' NOT NULL,
	"score_domicile" integer,
	"score_exterieur" integer,
	"widget_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shared_classements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"categorie" "categorie_equipe" NOT NULL,
	"saison" text NOT NULL,
	"rang" integer NOT NULL,
	"equipe" text NOT NULL,
	"joues" integer DEFAULT 0 NOT NULL,
	"gagnes" integer DEFAULT 0 NOT NULL,
	"nuls" integer DEFAULT 0 NOT NULL,
	"perdus" integer DEFAULT 0 NOT NULL,
	"buts_pour" integer DEFAULT 0 NOT NULL,
	"buts_contre" integer DEFAULT 0 NOT NULL,
	"difference" integer DEFAULT 0 NOT NULL,
	"points" integer DEFAULT 0 NOT NULL,
	"widget_id" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shared_resultats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"match_id" uuid NOT NULL,
	"score_domicile" integer NOT NULL,
	"score_exterieur" integer NOT NULL,
	"mi_temps_domicile" integer,
	"mi_temps_exterieur" integer,
	"finalise" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "assoc_cotisations" ADD CONSTRAINT "assoc_cotisations_membre_id_assoc_membres_id_fk" FOREIGN KEY ("membre_id") REFERENCES "public"."assoc_membres"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sa_contrats" ADD CONSTRAINT "sa_contrats_sponsor_id_sa_sponsors_id_fk" FOREIGN KEY ("sponsor_id") REFERENCES "public"."sa_sponsors"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared_resultats" ADD CONSTRAINT "shared_resultats_match_id_shared_calendrier_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."shared_calendrier"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_actu_assoc_publie" ON "assoc_actualites" USING btree ("publie","date_publication");--> statement-breakpoint
CREATE INDEX "idx_cotisations_membre" ON "assoc_cotisations" USING btree ("membre_id");--> statement-breakpoint
CREATE INDEX "idx_cotisations_saison" ON "assoc_cotisations" USING btree ("saison");--> statement-breakpoint
CREATE INDEX "idx_juniors_categorie" ON "assoc_juniors" USING btree ("categorie");--> statement-breakpoint
CREATE INDEX "idx_membres_nom" ON "assoc_membres" USING btree ("nom");--> statement-breakpoint
CREATE INDEX "idx_membres_type" ON "assoc_membres" USING btree ("type_membre");--> statement-breakpoint
CREATE INDEX "idx_accred_statut" ON "sa_accreditations" USING btree ("statut");--> statement-breakpoint
CREATE INDEX "idx_actu_sa_publie" ON "sa_actualites" USING btree ("publie","date_publication");--> statement-breakpoint
CREATE INDEX "idx_contrats_sponsor" ON "sa_contrats" USING btree ("sponsor_id");--> statement-breakpoint
CREATE INDEX "idx_premiere_poste" ON "sa_equipe_premiere" USING btree ("poste");--> statement-breakpoint
CREATE INDEX "idx_sponsors_niveau" ON "sa_sponsors" USING btree ("niveau");--> statement-breakpoint
CREATE INDEX "idx_calendrier_categorie" ON "shared_calendrier" USING btree ("categorie");--> statement-breakpoint
CREATE INDEX "idx_calendrier_date" ON "shared_calendrier" USING btree ("date_match");--> statement-breakpoint
CREATE INDEX "idx_classements_cat_saison" ON "shared_classements" USING btree ("categorie","saison");--> statement-breakpoint
CREATE INDEX "idx_resultats_match" ON "shared_resultats" USING btree ("match_id");