/**
 * Seed de données réelles SR Delémont — pour tester en local / staging.
 * Lancement : pnpm db:seed   (DATABASE_URL requise)
 *
 * Idempotent : vide puis réinsère les tables concernées (sponsors, équipes
 * Association, actualités Assoc & SA). Ne touche pas aux autres tables.
 */
import { config } from 'dotenv';
config({ path: ['.env', '../../.env'] });

import { getDb } from '../src/client';
import { sponsors, actualitesSa } from '../src/schema-sa';
import { equipesAssoc, actualitesAssoc } from '../src/schema-assoc';

const IMG = {
  team: 'https://srd.ch/wp-content/uploads/2024/09/7.jpg',
  action: 'https://srd.ch/wp-content/uploads/2024/09/DSC0021.jpg',
  stade: 'https://srd.ch/wp-content/uploads/2018/09/stade_infra_srdpresroses-copie.jpg',
  fem: 'https://srd.ch/wp-content/uploads/2023/07/AdobeStock_359545570.jpeg',
};

// --- Sponsors & partenaires réels du SRD ---
const SPONSORS = [
  { nom: 'Banque Cantonale du Jura (BCJ)', niveau: 'principal' as const, siteWeb: 'https://www.bcj.ch', description: 'Partenaire principal du club.', ordre: 1 },
  { nom: 'Zurich Assurance', niveau: 'or' as const, siteWeb: 'https://www.zurich.ch', description: null, ordre: 2 },
  { nom: 'Willemin-Macodel', niveau: 'or' as const, siteWeb: 'https://www.willemin-macodel.com', description: 'Machines-outils de haute précision, Delémont.', ordre: 3 },
  { nom: 'Ochsner Sport', niveau: 'argent' as const, siteWeb: 'https://www.ochsnersport.ch', description: null, ordre: 4 },
  { nom: 'Feldschlösschen', niveau: 'argent' as const, siteWeb: 'https://www.feldschloesschen.swiss', description: null, ordre: 5 },
  { nom: 'Cave La Romaine', niveau: 'partenaire' as const, siteWeb: 'https://www.cavelaromaine.ch', description: null, ordre: 6 },
  { nom: 'CLA', niveau: 'partenaire' as const, siteWeb: null, description: 'Partenaire du club.', ordre: 7 },
  { nom: 'Esprit Mobile', niveau: 'partenaire' as const, siteWeb: null, description: null, ordre: 8 },
  { nom: 'RFJ', niveau: 'media' as const, siteWeb: 'https://www.rfj.ch', description: 'Radio Fréquence Jura — partenaire média.', ordre: 9 },
  { nom: 'Canal Alpha', niveau: 'media' as const, siteWeb: 'https://www.canalalpha.ch', description: 'Télévision régionale — partenaire média.', ordre: 10 },
];

// --- Équipes actives gérées par l'Association (hors 1ère équipe = SRD SA) ---
const EQUIPES = [
  { nom: 'SR Delémont II', categorie: '3e ligue', description: "L'équipe réserve du club.", photoUrl: IMG.team, entraineurPrincipal: null, widgetId: 't-35977', ordre: 1 },
  { nom: 'SR Delémont III', categorie: '4e ligue', description: 'Troisième équipe masculine.', photoUrl: IMG.action, entraineurPrincipal: null, widgetId: 't-35978', ordre: 2 },
  { nom: 'SR Delémont Féminine', categorie: 'Football féminin', description: "L'équipe féminine du SRD.", photoUrl: IMG.fem, entraineurPrincipal: null, widgetId: 't-43678', ordre: 3 },
  { nom: 'SR Delémont Seniors +30', categorie: 'Seniors 30+', description: 'Les vétérans du club.', photoUrl: IMG.stade, entraineurPrincipal: null, widgetId: 't-35979', ordre: 4 },
];

// --- Actualités Association ---
const NEWS_ASSOC = [
  {
    titre: 'La 2e équipe poursuit sa belle saison en 3e ligue',
    slug: '2e-equipe-belle-saison-3e-ligue',
    chapo: 'La réserve delémontaine confirme match après match et vise le haut du classement.',
    contenu:
      "La deuxième équipe du SR Delémont réalise un excellent parcours en 3e ligue. Portée par un collectif solide, elle s'affirme comme une valeur sûre du football régional jurassien.",
    imageUrl: IMG.team,
    auteur: 'Comité SRD',
    categorie: 'Équipes',
    publie: true,
    datePublication: new Date('2026-06-20T10:00:00Z'),
  },
  {
    titre: 'Assemblée générale : rendez-vous des membres',
    slug: 'assemblee-generale-membres-2026',
    chapo: "L'Association convie ses membres à son assemblée générale ordinaire.",
    contenu:
      "L'assemblée générale de l'Association SR Delémont se tiendra prochainement. Tous les membres sont cordialement invités à participer à ce moment important de la vie du club.",
    imageUrl: IMG.stade,
    auteur: 'Comité SRD',
    categorie: 'Vie du club',
    publie: true,
    datePublication: new Date('2026-06-12T08:00:00Z'),
  },
];

// --- Actualités SRD SA (1ère ligue) ---
const NEWS_SA = [
  {
    titre: 'La 1ère équipe lance sa saison de 1ère ligue',
    slug: 'premiere-equipe-lancement-saison',
    chapo: 'Les Sports-Réunis Delémont abordent une nouvelle saison au troisième échelon national.',
    contenu:
      "L'équipe fanion du SR Delémont entame sa campagne de 1ère ligue avec ambition. Le staff et les joueurs sont prêts à défendre les couleurs jaune et noir au Stade de la Blancherie.",
    imageUrl: IMG.action,
    categorie: '1ère Ligue',
    publie: true,
    datePublication: new Date('2026-06-21T18:30:00Z'),
  },
  {
    titre: 'Abonnements 2025–2026 désormais disponibles',
    slug: 'abonnements-2025-2026-disponibles',
    chapo: 'Renouvelez ou souscrivez votre abonnement de saison pour vivre tous les matchs à domicile.',
    contenu:
      "La billetterie est ouverte : abonnements de saison, places à l'unité et formules hospitalité. Rejoignez le public de la Blancherie et soutenez le SRD tout au long de la saison.",
    imageUrl: IMG.fem,
    categorie: 'Billetterie',
    publie: true,
    datePublication: new Date('2026-06-10T09:00:00Z'),
  },
];

async function main() {
  const db = getDb();
  console.log('🌱 Seed SR Delémont — démarrage…');

  // Nettoyage (idempotence)
  await db.delete(actualitesSa);
  await db.delete(actualitesAssoc);
  await db.delete(sponsors);
  await db.delete(equipesAssoc);

  // Insertions
  await db.insert(sponsors).values(SPONSORS);
  console.log(`  ✓ ${SPONSORS.length} sponsors`);

  await db.insert(equipesAssoc).values(EQUIPES);
  console.log(`  ✓ ${EQUIPES.length} équipes (Association)`);

  await db.insert(actualitesAssoc).values(NEWS_ASSOC);
  console.log(`  ✓ ${NEWS_ASSOC.length} actualités Association`);

  await db.insert(actualitesSa).values(NEWS_SA);
  console.log(`  ✓ ${NEWS_SA.length} actualités SRD SA`);

  console.log('✅ Seed terminé.');
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Échec du seed :', err);
    process.exit(1);
  });
