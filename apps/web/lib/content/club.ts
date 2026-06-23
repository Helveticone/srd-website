/** Données PROVISOIRES typées — à remplacer par @srd/db. */

export interface ComiteMember {
  prenom: string;
  nom: string;
  fonction: string;
}

export const COMITE: ComiteMember[] = [
  { prenom: 'à', nom: 'définir', fonction: 'Président' },
  { prenom: 'à', nom: 'définir', fonction: 'Vice-président' },
  { prenom: 'à', nom: 'définir', fonction: 'Caissier' },
  { prenom: 'à', nom: 'définir', fonction: 'Secrétaire' },
  { prenom: 'à', nom: 'définir', fonction: 'Responsable juniors' },
  { prenom: 'à', nom: 'définir', fonction: 'Responsable technique' },
  { prenom: 'à', nom: 'définir', fonction: 'Responsable communication' },
  { prenom: 'à', nom: 'définir', fonction: 'Membre' },
];

export interface TimelineEntry {
  annee: string;
  evenement: string;
}

export const HISTOIRE: TimelineEntry[] = [
  { annee: '1909', evenement: 'Fondation des Sports-Réunis Delémont.' },
  { annee: '1980', evenement: 'Belles années en ligue nationale.' },
  { annee: '2000', evenement: 'Développement du centre de formation juniors.' },
  { annee: '2018', evenement: 'Refonte des infrastructures du Stade de la Blancherie.' },
  { annee: '2024', evenement: 'Structuration en Association, SRD SA et Académie.' },
  { annee: '2025', evenement: 'La première équipe évolue en 1ère ligue.' },
];

export interface StadeFact {
  label: string;
  valeur: string;
}

export const STADE: { nom: string; adresse: string; faits: StadeFact[]; image: string } = {
  nom: 'Stade de la Blancherie',
  adresse: 'Route de Bâle, 2800 Delémont',
  image: 'https://srd.ch/wp-content/uploads/2018/09/stade_infra_srdpresroses-copie.jpg',
  faits: [
    { label: 'Capacité', valeur: '~3 000 places' },
    { label: 'Pelouse', valeur: 'Naturelle' },
    { label: 'Tribune', valeur: 'Couverte' },
    { label: 'Éclairage', valeur: 'Oui' },
  ],
};

export interface Abonnement {
  nom: string;
  prix: string;
  avantages: string[];
  highlight?: boolean;
}

export const ABONNEMENTS: Abonnement[] = [
  {
    nom: 'Match à l’unité',
    prix: 'CHF 15.–',
    avantages: ['Place debout', '1 match de championnat', 'Tarif réduit AVS/étudiant'],
  },
  {
    nom: 'Abonnement saison',
    prix: 'CHF 180.–',
    avantages: ['Tous les matchs à domicile', 'Place assise tribune', 'Programme de match offert'],
    highlight: true,
  },
  {
    nom: 'Abonnement supporter',
    prix: 'CHF 350.–',
    avantages: ['Saison complète', 'Accès parking', 'Invitations événements club'],
  },
];

export interface Loge {
  nom: string;
  capacite: string;
  prestations: string[];
}

export const LOGES: Loge[] = [
  {
    nom: 'Loge Présidentielle',
    capacite: '20 personnes',
    prestations: ['Vue centrale', 'Restauration premium', 'Bar privatif', 'Parking VIP'],
  },
  {
    nom: 'Loge Affaires',
    capacite: '12 personnes',
    prestations: ['Catering', 'Espace networking', 'Accès salon VIP'],
  },
  {
    nom: 'Espace Hospitalité',
    capacite: 'Sur mesure',
    prestations: ['Formules groupes', 'Séminaires', 'Événements d’entreprise'],
  },
];
