/** Données PROVISOIRES typées — à remplacer par @srd/db (actualites_*). */
import type { EntityKey } from '@srd/shared/constants';

export interface NewsItem {
  titre: string;
  chapo: string;
  date: string;
  image: string;
}

const POOL: Record<EntityKey, NewsItem[]> = {
  association: [
    {
      titre: 'La 2e équipe enchaîne',
      chapo: 'Belle dynamique en 3e ligue pour la réserve delémontaine.',
      date: '21 juin 2026',
      image: 'https://srd.ch/wp-content/uploads/2024/09/7.jpg',
    },
    {
      titre: 'Assemblée générale ordinaire',
      chapo: 'Convocation et ordre du jour pour les membres de l’Association.',
      date: '19 juin 2026',
      image: 'https://srd.ch/wp-content/uploads/2018/09/stade_infra_srdpresroses-copie.jpg',
    },
    {
      titre: 'Tournoi juniors : merci aux bénévoles',
      chapo: 'Retour en images sur un week-end réussi à la Blancherie.',
      date: '15 juin 2026',
      image: 'https://srd.ch/wp-content/uploads/2024/09/DSC0021.jpg',
    },
  ],
  pro: [
    {
      titre: 'Victoire convaincante à domicile',
      chapo: 'La 1ère équipe s’impose 2-1 devant un public en fusion.',
      date: '21 juin 2026',
      image: 'https://srd.ch/wp-content/uploads/2024/09/DSC0021.jpg',
    },
    {
      titre: 'Mercato : le point sur l’effectif',
      chapo: 'Les mouvements en vue de la nouvelle saison de 1ère ligue.',
      date: '17 juin 2026',
      image: 'https://srd.ch/wp-content/uploads/2024/09/7.jpg',
    },
    {
      titre: 'Abonnements 2025–2026 ouverts',
      chapo: 'Renouvelez ou souscrivez votre abonnement saison.',
      date: '10 juin 2026',
      image: 'https://srd.ch/wp-content/uploads/2023/07/AdobeStock_359545570.jpeg',
    },
  ],
  academie: [
    {
      titre: 'L’Académie Young Stars recrute',
      chapo: 'Détections ouvertes pour les jeunes talents de la région.',
      date: '18 juin 2026',
      image: 'https://srd.ch/wp-content/uploads/2024/09/7.jpg',
    },
    {
      titre: 'Les U15 en stage',
      chapo: 'Une semaine intensive pour préparer la saison.',
      date: '14 juin 2026',
      image: 'https://srd.ch/wp-content/uploads/2023/07/AdobeStock_359545570.jpeg',
    },
    {
      titre: 'Nouveau partenariat formation',
      chapo: 'Un accompagnement renforcé pour nos juniors élite.',
      date: '08 juin 2026',
      image: 'https://srd.ch/wp-content/uploads/2024/09/DSC0021.jpg',
    },
  ],
};

export function getNews(entity: EntityKey): NewsItem[] {
  return POOL[entity];
}

export const GALLERY: string[] = [
  'https://srd.ch/wp-content/uploads/2024/09/DSC0021.jpg',
  'https://srd.ch/wp-content/uploads/2024/09/7.jpg',
  'https://srd.ch/wp-content/uploads/2023/07/AdobeStock_359545570.jpeg',
  'https://srd.ch/wp-content/uploads/2018/09/stade_infra_srdpresroses-copie.jpg',
];
