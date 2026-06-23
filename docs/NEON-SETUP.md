# 🐘 Base de données PostgreSQL avec Neon.tech

Guide pour provisionner une base **Neon** gratuite, récupérer la `DATABASE_URL`,
appliquer les **migrations Drizzle** et charger des **données de test SRD**.

> Neon = PostgreSQL serverless. Le plan gratuit suffit largement pour le dev et
> un staging (0.5 Go, 1 projet, branches incluses).

---

## 1. Créer la base Neon (gratuit)

1. Va sur **https://neon.tech** → **Sign up** (GitHub, Google ou e-mail).
2. **Create project** :
   - **Name** : `srd`
   - **Postgres version** : 16 (ou la plus récente)
   - **Region** : **Europe (Frankfurt)** `eu-central-1` — la plus proche de la Suisse.
3. Le projet est créé avec une base par défaut `neondb`.

## 2. Récupérer la `DATABASE_URL`

Dans le dashboard du projet → **Connection Details** :

- Sélectionne la base (`neondb`) et le rôle.
- **Copie la chaîne de connexion**. Elle ressemble à :

```
postgresql://srd_owner:XXXXXXXX@ep-cool-name-123456.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

> 🔌 **Pooled vs direct** : Neon propose une connexion *pooled* (hôte avec
> `-pooler`) et *directe*.
> - **Migrations & seed** (connexion courte depuis ta machine) → utilise la
>   connexion **directe** (sans `-pooler`).
> - **Runtime Cloudflare** (beaucoup de connexions courtes) → préfère la
>   connexion **pooled**.
> `sslmode=require` est obligatoire dans les deux cas.

## 3. Configurer l'environnement local

Crée un fichier **`.env` à la racine** du dépôt (déjà gitignoré) :

```bash
cp .env.example .env
```

Puis renseigne :

```dotenv
DATABASE_URL="postgresql://srd_owner:XXXX@ep-...eu-central-1.aws.neon.tech/neondb?sslmode=require"
```

> Le script de seed charge automatiquement `.env` (racine) **ou**
> `packages/db/.env` via `dotenv`. `drizzle-kit` lit `DATABASE_URL` depuis
> l'environnement (cf. `packages/db/drizzle.config.ts`).

## 4. Appliquer les migrations Drizzle

Les migrations sont **déjà générées** (`packages/db/drizzle/0000_*.sql`, 19 tables).
Applique-les sur Neon :

```bash
# (Optionnel) régénérer après un changement de schéma :
pnpm db:generate

# Appliquer les migrations → crée les 19 tables
pnpm db:migrate
```

## 5. Charger les données de test SRD

```bash
pnpm db:seed
```

Insère des **données réelles** : 10 sponsors/partenaires (BCJ, Zurich, Willemin-Macodel,
Ochsner Sport, Feldschlösschen, Cave La Romaine, CLA, Esprit Mobile, RFJ, Canal Alpha),
les 4 équipes actives de l'Association (II, III, Féminine, Seniors +30) et quelques
actualités récentes (Association + SRD SA). Le script est **idempotent** (il vide puis
réinsère ces tables).

## 6. Vérifier

```bash
pnpm db:studio        # Drizzle Studio (interface web locale)
```

Ou dans Neon → **SQL Editor** :

```sql
select nom, niveau from sa_sponsors order by ordre;
select nom, categorie from assoc_equipes;
select titre from sa_actualites;
```

---

## 7. Brancher Cloudflare Pages (production)

Ajoute `DATABASE_URL` comme **secret** aux deux projets admin (jamais en clair) —
de préférence la connexion **pooled** :

```bash
wrangler pages secret put DATABASE_URL --project-name srd-admin-assoc
wrangler pages secret put DATABASE_URL --project-name srd-admin-sa
```

(ou Dashboard Pages → Settings → Environment variables → **Encrypt**).

> Le site public `srd-web` n'accède **pas** à la base : ne lui mets pas
> `DATABASE_URL`.

---

## 🛠️ Dépannage

| Symptôme | Cause / solution |
| --- | --- |
| `DATABASE_URL est manquante` | `.env` absent ou non chargé — vérifie la racine du dépôt. |
| `no pg_hba.conf entry` / SSL | Ajoute `?sslmode=require` à l'URL. |
| `too many connections` | Utilise la connexion **pooled** (hôte `-pooler`). |
| Migrations rejouées | Drizzle suit l'état dans `drizzle/meta/` — ne supprime pas ce dossier. |
| Lenteur premier appel | Neon « scale-to-zero » : la base se réveille en ~1 s après inactivité. |
