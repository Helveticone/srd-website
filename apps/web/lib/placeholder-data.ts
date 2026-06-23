/**
 * Données PROVISOIRES pour la page d'accueil.
 * À remplacer par : Worker Edge football.ch (ticker/résultats) + @srd/db (actus).
 * Ne pas utiliser en production tel quel.
 */

export interface TickerResult {
  competition: string;
  domicile: string;
  exterieur: string;
  score: string;
  statut: 'termine' | 'live' | 'a_venir';
}

export const TICKER_RESULTS: TickerResult[] = [
  { competition: '1L', domicile: 'SR Delémont', exterieur: 'Yverdon Sport II', score: '2 - 1', statut: 'termine' },
  { competition: '1L', domicile: 'Stade Nyonnais II', exterieur: 'SR Delémont', score: '0 - 3', statut: 'termine' },
  { competition: '3L', domicile: 'SR Delémont II', exterieur: 'Bassecourt', score: '1 - 1', statut: 'termine' },
  { competition: 'Fém.', domicile: 'SR Delémont', exterieur: 'Etoile-Sporting', score: '4 - 0', statut: 'termine' },
  { competition: '1L', domicile: 'SR Delémont', exterieur: 'Lausanne-Ouchy II', score: '1 - 0', statut: 'live' },
  { competition: '4L', domicile: 'Courtételle', exterieur: 'SR Delémont III', score: '-', statut: 'a_venir' },
];

export interface MatchAvenir {
  competition: string;
  domicile: string;
  exterieur: string;
  date: string;
  heure: string;
  lieu: string;
}

export const PROCHAINS_MATCHS: MatchAvenir[] = [
  {
    competition: '1ère Ligue',
    domicile: 'SR Delémont',
    exterieur: 'FC Bavois',
    date: 'Sam. 28 juin',
    heure: '17:30',
    lieu: 'Stade de la Blancherie',
  },
  {
    competition: '1ère Ligue',
    domicile: 'FC Saint-Prex',
    exterieur: 'SR Delémont',
    date: 'Sam. 5 juillet',
    heure: '18:00',
    lieu: 'Stade des Coulets',
  },
  {
    competition: 'Coupe',
    domicile: 'SR Delémont',
    exterieur: 'FC Bassecourt',
    date: 'Mer. 9 juillet',
    heure: '20:00',
    lieu: 'Stade de la Blancherie',
  },
];

import type { EntityKey } from '@srd/shared/constants';

export interface ActualitePreview {
  titre: string;
  chapo: string;
  categorie: string;
  entity: EntityKey;
  date: string;
  imageUrl: string;
  href: string;
}

export const ACTUALITES: ActualitePreview[] = [
  {
    titre: 'Victoire convaincante à domicile',
    chapo: 'La 1ère équipe s’impose 2-1 face à un adversaire accrocheur devant un public en fusion.',
    categorie: '1ère Ligue',
    entity: 'pro',
    date: '21 juin 2026',
    imageUrl: 'https://srd.ch/wp-content/uploads/2024/09/DSC0021.jpg',
    href: '/1ere-ligue/actualites',
  },
  {
    titre: 'L’Académie Young Stars recrute',
    chapo: 'Le centre de formation ouvre ses portes aux jeunes talents de la région jurassienne.',
    categorie: 'Académie',
    entity: 'academie',
    date: '18 juin 2026',
    imageUrl: 'https://srd.ch/wp-content/uploads/2024/09/7.jpg',
    href: '/academie/recrutement',
  },
  {
    titre: 'Le Stade de la Blancherie fait peau neuve',
    chapo: 'Retour sur les travaux d’infrastructure menés pour accueillir la 1ère ligue dans les meilleures conditions.',
    categorie: 'Association',
    entity: 'association',
    date: '12 juin 2026',
    imageUrl: 'https://srd.ch/wp-content/uploads/2018/09/stade_infra_srdpresroses-copie.jpg',
    href: '/association/histoire',
  },
];
