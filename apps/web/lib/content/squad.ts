/** Données PROVISOIRES typées — à remplacer par @srd/db (schema-sa). */

export type Poste = 'Gardiens' | 'Défenseurs' | 'Milieux' | 'Attaquants';

export interface Player {
  numero: number;
  prenom: string;
  nom: string;
  poste: Poste;
  nationalite: string;
}

export const PREMIERE_SQUAD: Player[] = [
  { numero: 1, prenom: 'Luca', nom: 'Berberat', poste: 'Gardiens', nationalite: '🇨🇭' },
  { numero: 30, prenom: 'Noah', nom: 'Vuillaume', poste: 'Gardiens', nationalite: '🇨🇭' },
  { numero: 2, prenom: 'Théo', nom: 'Chappuis', poste: 'Défenseurs', nationalite: '🇨🇭' },
  { numero: 4, prenom: 'Marvin', nom: 'Saunier', poste: 'Défenseurs', nationalite: '🇫🇷' },
  { numero: 5, prenom: 'David', nom: 'Rebetez', poste: 'Défenseurs', nationalite: '🇨🇭' },
  { numero: 3, prenom: 'Kevin', nom: 'Membrez', poste: 'Défenseurs', nationalite: '🇨🇭' },
  { numero: 6, prenom: 'Antoine', nom: 'Charmillot', poste: 'Milieux', nationalite: '🇨🇭' },
  { numero: 8, prenom: 'Bryan', nom: 'Koné', poste: 'Milieux', nationalite: '🇨🇮' },
  { numero: 10, prenom: 'Yann', nom: 'Froidevaux', poste: 'Milieux', nationalite: '🇨🇭' },
  { numero: 14, prenom: 'Diego', nom: 'Ferreira', poste: 'Milieux', nationalite: '🇵🇹' },
  { numero: 7, prenom: 'Loïc', nom: 'Schaffter', poste: 'Attaquants', nationalite: '🇨🇭' },
  { numero: 9, prenom: 'Samuel', nom: 'Eboa', poste: 'Attaquants', nationalite: '🇨🇲' },
  { numero: 11, prenom: 'Maxime', nom: 'Jeanbourquin', poste: 'Attaquants', nationalite: '🇨🇭' },
];

export const POSTES: Poste[] = ['Gardiens', 'Défenseurs', 'Milieux', 'Attaquants'];

export interface StaffMember {
  prenom: string;
  nom: string;
  fonction: string;
}

export const PREMIERE_STAFF: StaffMember[] = [
  { prenom: 'à', nom: 'définir', fonction: 'Entraîneur principal' },
  { prenom: 'à', nom: 'définir', fonction: 'Entraîneur assistant' },
  { prenom: 'à', nom: 'définir', fonction: 'Entraîneur des gardiens' },
  { prenom: 'à', nom: 'définir', fonction: 'Préparateur physique' },
  { prenom: 'à', nom: 'définir', fonction: 'Physiothérapeute' },
  { prenom: 'à', nom: 'définir', fonction: 'Team manager' },
];
