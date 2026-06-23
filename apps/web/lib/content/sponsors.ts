/** Données PROVISOIRES typées — à remplacer par @srd/db (schema-sa). */

export type NiveauSponsor = 'Principal' | 'Or' | 'Argent' | 'Partenaire' | 'Média';

export interface SponsorItem {
  nom: string;
  niveau: NiveauSponsor;
}

export const SPONSORS: SponsorItem[] = [
  { nom: 'Sponsor Principal', niveau: 'Principal' },
  { nom: 'Willemin-Macodel', niveau: 'Or' },
  { nom: 'Ochsner Sport', niveau: 'Or' },
  { nom: 'Feldschlösschen', niveau: 'Argent' },
  { nom: 'Ville de Delémont', niveau: 'Partenaire' },
  { nom: 'SID Delémont', niveau: 'Partenaire' },
  { nom: 'La Romaine', niveau: 'Partenaire' },
  { nom: 'Le Quotidien Jurassien', niveau: 'Média' },
  { nom: 'RFJ', niveau: 'Média' },
  { nom: 'Canal Alpha', niveau: 'Média' },
];

export const NIVEAUX: NiveauSponsor[] = ['Principal', 'Or', 'Argent', 'Partenaire', 'Média'];
