# SR Delémont — Monorepo `srd.ch`

Monorepo professionnel du club de football **SR Delémont**.

> Stack : **pnpm workspaces + Turborepo · Next.js 15 (App Router) · TypeScript strict · Tailwind CSS v4 · Drizzle ORM + PostgreSQL · Cloudflare Pages / Workers / R2**

---

## 🏗️ Structure

```
srd-website/
├── apps/
│   ├── web/           → Site public          srd.ch
│   ├── admin-assoc/   → Admin Association     admin.srd.ch
│   └── admin-sa/      → Admin SRD SA          admin.pro.srd.ch
├── packages/
│   ├── ui/            → Design system partagé (Button, Card, Badge, Input, Table, Nav)
│   ├── db/            → Schémas Drizzle + migrations (assoc / sa / shared)
│   └── shared/        → Types & constantes TypeScript communs
└── cloudflare/
    └── workers/
        └── scores-live/  → Edge API scores football.ch live
```

## 🎨 Design system

| Token            | Valeur     |
| ---------------- | ---------- |
| Noir             | `#0a0a0a`  |
| Jaune SRD        | `#F5C800`  |
| Fond sombre      | `#141414`  |
| Bordures         | `#1e1e1e`  |
| Police titres    | Barlow Condensed (900) |
| Police corps     | Barlow     |

Thème : **dark, premium, sportif**.

## 🔐 Séparation Association / SA

- **admin.srd.ch** (Association) — rôle JWT `assoc-admin`. Ne peut PAS accéder aux données SA.
- **admin.pro.srd.ch** (SRD SA) — rôle JWT `sa-admin`. Ne peut PAS accéder aux données Association.
- Authentification via **Cloudflare Access** + middleware Next.js qui vérifie le rôle.
- Bases séparées : `schema-assoc.ts`, `schema-sa.ts`, `schema-shared.ts` (lecture seule partagée).

---

## 🚀 Setup

### Prérequis

- Node.js ≥ 20
- pnpm ≥ 9 (`npm i -g pnpm`)
- PostgreSQL (local ou hébergé)
- Wrangler CLI (`pnpm add -g wrangler`) pour Cloudflare

### Installation

```bash
# 1. Installer les dépendances
pnpm install

# 2. Configurer l'environnement
cp .env.example .env
#   → renseigner DATABASE_URL, Cloudflare Access, R2, widgets football.ch

# 3. Générer et appliquer les migrations Drizzle
pnpm db:generate
pnpm db:migrate
```

### Développement

```bash
pnpm dev            # lance les 3 apps en parallèle (Turborepo)
# ou individuellement :
pnpm --filter @srd/web dev          # http://localhost:3000
pnpm --filter @srd/admin-assoc dev  # http://localhost:3001
pnpm --filter @srd/admin-sa dev     # http://localhost:3002
```

### Scripts utiles

| Commande            | Description                              |
| ------------------- | ---------------------------------------- |
| `pnpm build`        | Build de toutes les apps                 |
| `pnpm lint`         | Lint du monorepo                         |
| `pnpm type-check`   | Vérification TypeScript                  |
| `pnpm db:generate`  | Génère les migrations Drizzle            |
| `pnpm db:migrate`   | Applique les migrations                  |
| `pnpm db:studio`    | Ouvre Drizzle Studio                     |
| `pnpm format`       | Formate avec Prettier                    |

---

## 📡 Intégrations

- **football.ch** — widgets embed (résultats / classements live). IDs dans `.env.example`.
- **Cloudflare R2** — stockage des médias (photos, vidéos).
- **next/image** — optimisation via Cloudflare loader.
- **Worker Edge** `scores-live` — API scores live mise en cache.

---

## ☁️ Déploiement

Chaque app est déployée sur **Cloudflare Pages**, le Worker sur **Cloudflare Workers**.
Voir les fichiers `wrangler.toml` respectifs (étape de configuration dédiée).
