/** Données PROVISOIRES typées — à remplacer par @srd/db (schema-assoc). */

export interface TeamInfo {
  nom: string;
  categorie: string;
  ligue: string;
  entraineur: string;
  image: string;
  widgetKey?: '3e' | '4e' | 'seniors30' | 'feminine';
}

export const ASSOCIATION_TEAMS: TeamInfo[] = [
  {
    nom: 'SR Delémont II',
    categorie: '2e équipe',
    ligue: '3e ligue',
    entraineur: 'à définir',
    image: 'https://srd.ch/wp-content/uploads/2024/09/7.jpg',
    widgetKey: '3e',
  },
  {
    nom: 'SR Delémont III',
    categorie: '3e équipe',
    ligue: '4e ligue',
    entraineur: 'à définir',
    image: 'https://srd.ch/wp-content/uploads/2024/09/DSC0021.jpg',
    widgetKey: '4e',
  },
  {
    nom: 'SR Delémont Féminine',
    categorie: 'Féminine',
    ligue: 'Ligue féminine',
    entraineur: 'à définir',
    image: 'https://srd.ch/wp-content/uploads/2023/07/AdobeStock_359545570.jpeg',
    widgetKey: 'feminine',
  },
  {
    nom: 'SR Delémont Vétérans',
    categorie: 'Seniors +30',
    ligue: 'Seniors 30+',
    entraineur: 'à définir',
    image: 'https://srd.ch/wp-content/uploads/2018/09/stade_infra_srdpresroses-copie.jpg',
    widgetKey: 'seniors30',
  },
];

export interface AcademieCategory {
  code: string;
  tranche: string;
  description: string;
  youngStars: boolean;
}

export const ACADEMIE_CATEGORIES: AcademieCategory[] = [
  { code: 'U8', tranche: '6–8 ans', description: 'Éveil & motricité', youngStars: false },
  { code: 'U9', tranche: '8–9 ans', description: 'Initiation au jeu', youngStars: false },
  { code: 'U10', tranche: '9–10 ans', description: 'Football à 7', youngStars: false },
  { code: 'U11', tranche: '10–11 ans', description: 'Football à 7', youngStars: true },
  { code: 'U12', tranche: '11–12 ans', description: 'Football à 9', youngStars: true },
  { code: 'U13', tranche: '12–13 ans', description: 'Football à 9', youngStars: true },
  { code: 'U14', tranche: '13–14 ans', description: 'Football à 11', youngStars: true },
  { code: 'U15', tranche: '14–15 ans', description: 'Football à 11', youngStars: true },
  { code: 'U16', tranche: '15–16 ans', description: 'Formation avancée', youngStars: true },
  { code: 'U17', tranche: '16–17 ans', description: 'Pré-élite', youngStars: true },
  { code: 'U18', tranche: '17–18 ans', description: 'Élite juniors', youngStars: true },
  { code: 'U21', tranche: '18–21 ans', description: 'Passerelle vers la 1ère', youngStars: true },
];
