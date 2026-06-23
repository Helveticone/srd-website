# 🚀 Déploiement — SR Delémont sur Cloudflare

Guide pas à pas pour déployer le monorepo **de zéro** sur Cloudflare Pages +
Workers, avec authentification Cloudflare Access et le domaine `srd.ch`.

---

## 🗺️ Vue d'ensemble

| Composant | Type Cloudflare | Domaine | Auth |
| --- | --- | --- | --- |
| `@srd/web` | Pages (`srd-web`) | `srd.ch`, `www.srd.ch` | Public |
| `@srd/admin-assoc` | Pages (`srd-admin-assoc`) | `admin.srd.ch` | **Access** (rôle `assoc-admin`) |
| `@srd/admin-sa` | Pages (`srd-admin-sa`) | `admin.pro.srd.ch` | **Access** (rôle `sa-admin`) |
| `scores-live` | Worker (`srd-scores-live`) | `api.srd.ch/scores` | Public (cache) |
| Médias | R2 (`srd-media`) | `media.srd.ch` | Public en lecture |

> Le site public **n'accède jamais à la base de données**. Seuls les deux admins
> y accèdent, chacun cloisonné à son propre schéma (`schema-assoc` / `schema-sa`).

### Prérequis

- Un compte **Cloudflare** avec le domaine **`srd.ch`** géré dans Cloudflare DNS
  (nameservers Cloudflare actifs).
- **Cloudflare Access** activé (Zero Trust — plan gratuit suffisant).
- `pnpm` ≥ 9, Node ≥ 20, et `wrangler` (`pnpm add -g wrangler`).
- Une base **PostgreSQL** accessible publiquement (Neon, Supabase, …).
- Le code poussé sur un dépôt **GitHub/GitLab** (pour le déploiement Git de Pages).

```bash
wrangler login   # authentifie la CLI sur ton compte Cloudflare
```

---

## Étape A — Bucket R2 (médias)

```bash
wrangler r2 bucket create srd-media
```

1. Dashboard → **R2** → bucket `srd-media` → **Settings** → **Public access** →
   connecter un domaine personnalisé **`media.srd.ch`** (crée automatiquement
   l'enregistrement DNS).
2. Le binding `MEDIA` est déjà déclaré dans les `wrangler.toml` des deux admins.

---

## Étape B — Base de données PostgreSQL

1. Crée une base (ex. Neon) et récupère l'URL de connexion
   `postgresql://user:password@host/db?sslmode=require`.
2. Applique les migrations Drizzle depuis ta machine :

```bash
cp .env.example .env          # renseigne DATABASE_URL
pnpm db:generate              # (déjà généré : drizzle/0000_*.sql)
pnpm db:migrate               # crée les 19 tables
```

`DATABASE_URL` sera ensuite ajoutée comme **secret** aux deux projets admin (étape C).

---

## Étape C — Créer les 3 projets Cloudflare Pages

Pour **chaque** app, dashboard → **Workers & Pages** → **Create** → **Pages** →
**Connect to Git** → sélectionne le dépôt, puis configure (monorepo pnpm) :

### 1. `srd-web` (site public)

| Réglage | Valeur |
| --- | --- |
| Project name | `srd-web` |
| Production branch | `main` |
| Root directory | `apps/web` |
| Build command | `npx @cloudflare/next-on-pages@1` |
| Build output directory | `.vercel/output/static` |
| Variables d'env (Build) | `NODE_VERSION = 20` |

> Cloudflare détecte `pnpm` via `pnpm-lock.yaml` à la racine et installe tout le
> workspace. La compatibilité `nodejs_compat` provient du `wrangler.toml` de l'app.

> **🔧 Compatibilité adaptateur.** Next est **épinglé à `15.5.2`** car
> `@cloudflare/next-on-pages@1.13.x` supporte officiellement Next ≤ 15.5.2.
> La commande `npx @cloudflare/next-on-pages@1` télécharge automatiquement son
> peer `vercel` pendant le build Cloudflare (inutile de l'installer localement).
> Pour un build **local**, ajoute-le : `pnpm --filter @srd/<app> add -D vercel`.
> _Alternative_ : migrer vers `@opennextjs/cloudflare` (déploiement Workers) qui
> suit les versions récentes de Next — non retenu ici car le cahier des charges
> cible **Cloudflare Pages**.

Variables runtime (Settings → Environment variables) — déjà dans `wrangler.toml`,
à dupliquer ici si tu préfères les gérer au dashboard :
`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_ADMIN_ASSOC_URL`, `NEXT_PUBLIC_ADMIN_SA_URL`,
`NEXT_PUBLIC_CF_IMAGES_URL`.

### 2. `srd-admin-assoc` (admin Association)

| Réglage | Valeur |
| --- | --- |
| Project name | `srd-admin-assoc` |
| Root directory | `apps/admin-assoc` |
| Build command | `npx @cloudflare/next-on-pages@1` |
| Build output directory | `.vercel/output/static` |
| `NODE_VERSION` | `20` |

Variables / secrets :

| Clé | Type | Valeur |
| --- | --- | --- |
| `CF_ACCESS_TEAM_DOMAIN` | Variable | `srd.cloudflareaccess.com` |
| `CF_ACCESS_AUD_ASSOC` | Variable | _(AUD de l'app Access — étape D)_ |
| `DATABASE_URL` | **Secret** (Encrypt) | URL Postgres |

### 3. `srd-admin-sa` (admin SRD SA)

Identique, avec `Root directory = apps/admin-sa` et :

| Clé | Type | Valeur |
| --- | --- | --- |
| `CF_ACCESS_TEAM_DOMAIN` | Variable | `srd.cloudflareaccess.com` |
| `CF_ACCESS_AUD_SA` | Variable | _(AUD de l'app Access — étape D)_ |
| `DATABASE_URL` | **Secret** | URL Postgres |

> **Alternative en ligne de commande** (depuis chaque dossier d'app) :
> ```bash
> pnpm --filter @srd/web build && cd apps/web && npx @cloudflare/next-on-pages@1
> wrangler pages deploy .vercel/output/static --project-name srd-web
> # secret :
> wrangler pages secret put DATABASE_URL --project-name srd-admin-assoc
> ```

---

## Étape D — Cloudflare Access (les 2 applications admin)

C'est ici que se joue le **cloisonnement strict** : **deux applications Access
distinctes**, chacune avec son propre **AUD** et sa propre policy. Un jeton émis
pour l'une est automatiquement rejeté par l'autre (vérification de l'`aud` dans le
middleware).

Dashboard → **Zero Trust** → **Access** → **Applications** → **Add an application**
→ **Self-hosted**.

### Application 1 — Admin Association

1. **Application name** : `SRD Admin Association`
2. **Session duration** : 24h (au choix)
3. **Application domain** : `admin.srd.ch`
4. **Identity providers** : active au moins un IdP (Google, e-mail OTP, …).
5. **Policies** → **Add a policy** :
   - Name : `Comité Association`
   - Action : **Allow**
   - Include : `Emails` → liste des membres du comité (ou un groupe).
6. **Save**. Puis ouvre l'application → onglet **Overview** → copie l'**Application
   Audience (AUD) Tag** → c'est `CF_ACCESS_AUD_ASSOC`.

### Application 2 — Admin SRD SA

Refais l'opération :
- **Application name** : `SRD Admin SA`
- **Application domain** : `admin.pro.srd.ch`
- **Policy** : `Direction SA` → Allow → e-mails de la direction SA **(distincts !)**
- Copie l'**AUD** → c'est `CF_ACCESS_AUD_SA`.

### Renseigner les AUD

Reporte les deux AUD :
- dans le dashboard Pages (variables des projets `srd-admin-assoc` / `srd-admin-sa`),
- **et** dans les `wrangler.toml` correspondants (remplace les `REMPLACER_PAR_AUD_*`).

Récupère aussi ton **Team domain** (Zero Trust → Settings → Custom Pages, ou
l'URL `https://<team>.cloudflareaccess.com`) et ajuste `CF_ACCESS_TEAM_DOMAIN`
si différent de `srd.cloudflareaccess.com`.

> 🔒 **Pourquoi c'est étanche** : même si une personne figure dans les deux
> policies, le JWT qu'elle obtient sur `admin.srd.ch` porte l'AUD de l'app Assoc.
> Présenté à `admin.pro.srd.ch`, il échoue à la vérification `audience` → 403.
> Le middleware ajoute un contrôle de rôle (`assoc-admin` vs `sa-admin`).

---

## Étape E — Worker Edge (scores football.ch live)

```bash
cd cloudflare/workers/scores-live
wrangler deploy
```

Puis dashboard → Worker `srd-scores-live` → **Triggers** → **Custom Domains** ou
**Routes** → ajoute `api.srd.ch/scores*`.

---

## Étape F — Connecter le domaine srd.ch

Pour chaque projet Pages : **Settings** → **Custom domains** → **Set up a domain**.

| Projet Pages | Domaine personnalisé | DNS créé |
| --- | --- | --- |
| `srd-web` | `srd.ch` **et** `www.srd.ch` | `CNAME` (proxy ☁️) |
| `srd-admin-assoc` | `admin.srd.ch` | `CNAME` (proxy ☁️) |
| `srd-admin-sa` | `admin.pro.srd.ch` | `CNAME` (proxy ☁️) |

Cloudflare crée et proxifie automatiquement les enregistrements (le domaine étant
déjà sur Cloudflare DNS). Le TLS est provisionné en quelques minutes.

- Redirection `www` → apex : **Rules** → **Redirect Rules** (`www.srd.ch/*` → `https://srd.ch/$1`).
- Vérifie que `media.srd.ch` (R2, étape A) et `api.srd.ch` (Worker, étape E)
  pointent bien.

> ⚠️ Les domaines `admin.srd.ch` et `admin.pro.srd.ch` doivent correspondre
> **exactement** aux *Application domains* déclarés dans Cloudflare Access (étape D),
> sinon Access ne s'interpose pas.

---

## 📋 Récapitulatif des variables

| Variable | srd-web | srd-admin-assoc | srd-admin-sa | Type |
| --- | :-: | :-: | :-: | --- |
| `NODE_VERSION` | ✅ | ✅ | ✅ | Build var (`20`) |
| `CF_ACCESS_TEAM_DOMAIN` | — | ✅ | ✅ | Variable |
| `CF_ACCESS_AUD_ASSOC` | — | ✅ | — | Variable |
| `CF_ACCESS_AUD_SA` | — | — | ✅ | Variable |
| `DATABASE_URL` | — | ✅ | ✅ | **Secret** |
| `NEXT_PUBLIC_*` | ✅ | — | — | Variable |
| Binding `MEDIA` (R2) | (opt.) | ✅ | ✅ | r2_bucket |

---

## ✅ Checklist finale

- [ ] `srd.ch` répond et affiche le Hub (3 espaces).
- [ ] Le switcher Association / 1ère Ligue / Académie change l'accent et le logo.
- [ ] Les widgets football.ch (résultats live) se chargent.
- [ ] `admin.srd.ch` redirige vers l'écran de connexion **Cloudflare Access**.
- [ ] Après login comité → `/dashboard` Association s'affiche avec l'e-mail.
- [ ] Un compte SA **ne peut pas** ouvrir `admin.srd.ch` (et inversement) → 403.
- [ ] Les migrations Drizzle sont appliquées (19 tables).
- [ ] `media.srd.ch` sert un fichier de test depuis R2.
- [ ] Le Worker `api.srd.ch/scores` répond `{ "ok": true }`.

---

## 🔁 Déploiements suivants

Avec l'intégration Git, **chaque `git push` sur `main`** redéploie automatiquement
les projets impactés. Les Pull Requests génèrent des **preview deployments**.
Pour un déploiement manuel : `pnpm --filter @srd/<app> pages:build` puis
`pnpm --filter @srd/<app> pages:deploy`.
