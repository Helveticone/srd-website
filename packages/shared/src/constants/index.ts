// Constantes communes SR Delémont

export const SITE_NAME = 'SR Delémont';
export const SITE_BASELINE = 'Club de football — Delémont, Jura';

export interface NavLink {
  label: string;
  href: string;
}

/* =========================================================================
   ENTITÉS PUBLIQUES — 3 espaces distincts sous srd.ch
   Base noir/jaune commune ; chaque entité a son accent primaire propre.
   ========================================================================= */

export type EntityKey = 'association' | 'pro' | 'academie';

export interface Entity {
  key: EntityKey;
  /** Libellé switcher + suffixe du lockup logo. */
  label: string;
  basePath: string;
  /** Couleur d'accent primaire (différenciation forte). */
  accent: string;
  accentName: string;
  tagline: string;
  description: string;
  /** Image d'illustration (srd.ch). */
  image: string;
  /** Catégories de widgets football.ch propres à l'entité. */
  widgetKeys: WidgetKey[];
  nav: NavLink[];
}

export const ASSOCIATION_NAV: NavLink[] = [
  { label: 'Accueil', href: '/association' },
  { label: 'Équipes', href: '/association/equipes' },
  { label: 'Organisation', href: '/association/organisation' },
  { label: 'Histoire', href: '/association/histoire' },
  { label: 'Fanzone', href: '/association/fanzone' },
  { label: 'Actualités', href: '/association/actualites' },
];

export const PRO_NAV: NavLink[] = [
  { label: 'Accueil', href: '/1ere-ligue' },
  { label: 'Effectif', href: '/1ere-ligue/effectif' },
  { label: 'Matchs', href: '/1ere-ligue/matchs' },
  { label: 'Stade', href: '/1ere-ligue/stade' },
  { label: 'Abonnements', href: '/1ere-ligue/abonnements' },
  { label: 'Loges', href: '/1ere-ligue/loges' },
  { label: 'Sponsors', href: '/1ere-ligue/sponsors' },
  { label: 'Presse', href: '/1ere-ligue/presse' },
];

export const ACADEMIE_NAV: NavLink[] = [
  { label: 'Accueil', href: '/academie' },
  { label: 'Équipes', href: '/academie/equipes' },
  { label: 'Young Stars', href: '/academie/young-stars' },
  { label: 'Recrutement', href: '/academie/recrutement' },
  { label: 'Staff', href: '/academie/staff' },
  { label: 'Actualités', href: '/academie/actualites' },
];

export const ENTITIES: Entity[] = [
  {
    key: 'association',
    label: 'Association',
    basePath: '/association',
    accent: '#F5C800',
    accentName: 'Jaune SRD',
    tagline: 'Le club, depuis toujours',
    description:
      'Le cœur historique des Sports-Réunis Delémont : équipes actives, organisation, vie du club et passion.',
    image: 'https://srd.ch/wp-content/uploads/2024/09/7.jpg',
    widgetKeys: ['3e', '4e', 'seniors30', 'feminine'],
    nav: ASSOCIATION_NAV,
  },
  {
    key: 'pro',
    label: '1ère Ligue',
    basePath: '/1ere-ligue',
    accent: '#C0C5CE',
    accentName: 'Argent',
    tagline: 'L’élite au sommet',
    description:
      'La première équipe en 1ère ligue : effectif, matchs, Stade de la Blancherie, billetterie et hospitalité.',
    image: 'https://srd.ch/wp-content/uploads/2024/09/DSC0021.jpg',
    widgetKeys: ['1ere'],
    nav: PRO_NAV,
  },
  {
    key: 'academie',
    label: 'Académie',
    basePath: '/academie',
    accent: '#A3E635',
    accentName: 'Lime',
    tagline: 'Les talents de demain',
    description:
      'Le centre de formation Young Stars : juniors U8 à U21, encadrement, détection et recrutement.',
    image: 'https://srd.ch/wp-content/uploads/2023/07/AdobeStock_359545570.jpeg',
    widgetKeys: [],
    nav: ACADEMIE_NAV,
  },
];

export function getEntityByKey(key: EntityKey): Entity {
  return ENTITIES.find((e) => e.key === key)!;
}

/** Résout l'entité courante à partir du chemin (null sur le hub /). */
export function getEntityFromPath(pathname: string): Entity | null {
  return ENTITIES.find((e) => pathname === e.basePath || pathname.startsWith(`${e.basePath}/`)) ?? null;
}

/* -------------------------------------------------------------------------
   Navigation admin
   ------------------------------------------------------------------------- */

export const ADMIN_ASSOC_NAV: NavLink[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Actualités', href: '/actualites' },
  { label: 'Équipes', href: '/equipes' },
  { label: 'Formation', href: '/formation' },
  { label: 'Comité', href: '/comite' },
  { label: 'Membres', href: '/membres' },
  { label: 'Calendrier', href: '/calendrier' },
  { label: 'Documents', href: '/documents' },
  { label: 'Photos', href: '/photos' },
];

export const ADMIN_SA_NAV: NavLink[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Équipe 1ère', href: '/equipe-premiere' },
  { label: 'Sponsors', href: '/sponsors' },
  { label: 'Loges', href: '/loges' },
  { label: 'Stade', href: '/stade' },
  { label: 'Actualités', href: '/actualites' },
  { label: 'SRD TV', href: '/srd-tv' },
  { label: 'Accréditations', href: '/accreditations' },
];

/* -------------------------------------------------------------------------
   Widgets football.ch — résultats / classements live.
   Format d'embed réel (relevé sur srd.ch) :
   https://widget.football.ch/{lang}/Widgets.aspx/{verein}/{team}/{vue}/
   ------------------------------------------------------------------------- */

export const FOOTBALL_VEREIN_ID = 'v-1233';
export const FOOTBALL_DEFAULT_VIEW = 'a-trr';

export type WidgetKey = '1ere' | '3e' | '4e' | 'seniors30' | 'feminine';

export interface FootballTeamWidget {
  key: WidgetKey;
  label: string;
  teamId: string;
}

export const FOOTBALL_WIDGETS: FootballTeamWidget[] = [
  { key: '1ere', label: '1ère Ligue', teamId: 't-35976' },
  { key: '3e', label: '3e Ligue', teamId: 't-35977' },
  { key: '4e', label: '4e Ligue', teamId: 't-35978' },
  { key: 'seniors30', label: 'Seniors 30+', teamId: 't-35979' },
  { key: 'feminine', label: 'Féminine', teamId: 't-43678' },
];

export function getWidget(key: WidgetKey): FootballTeamWidget {
  return FOOTBALL_WIDGETS.find((w) => w.key === key)!;
}

/** Construit l'URL d'embed iframe d'un widget football.ch. */
export function footballWidgetUrl(
  teamId: string,
  view: string = FOOTBALL_DEFAULT_VIEW,
  lang: 'fr' | 'de' | 'it' = 'fr',
): string {
  return `https://widget.football.ch/${lang}/Widgets.aspx/${FOOTBALL_VEREIN_ID}/${teamId}/${view}/`;
}
