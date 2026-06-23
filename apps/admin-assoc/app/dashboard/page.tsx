import {
  Badge,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@srd/ui';
import { getAdminIdentity } from '@/lib/auth';

export const metadata = { title: 'Dashboard' };

// NOTE: chiffres provisoires — à remplacer par des requêtes @srd/db (schema-assoc).
const STATS = [
  { label: 'Membres', value: '342', hint: '+12 cette saison' },
  { label: 'Équipes actives', value: '9', hint: '2e → 4e, féminine, +30' },
  { label: 'Actualités publiées', value: '57', hint: '4 ce mois-ci' },
  { label: 'Cotisations en attente', value: '23', hint: 'à relancer' },
];

const DERNIERES_ACTUS = [
  { titre: 'Victoire de la 2e équipe', statut: 'Publié', date: '21.06.2026' },
  { titre: 'AG ordinaire — convocation', statut: 'Brouillon', date: '19.06.2026' },
  { titre: 'Tournoi juniors : résultats', statut: 'Publié', date: '15.06.2026' },
];

const RACCOURCIS = [
  { label: 'Nouvelle actualité', href: '/actualites' },
  { label: 'Gérer les équipes', href: '/equipes' },
  { label: 'Membres & cotisations', href: '/membres' },
  { label: 'Comité', href: '/comite' },
];

export default async function DashboardPage() {
  const identity = await getAdminIdentity();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-black uppercase tracking-tight">Dashboard</h1>
          <p className="text-sm text-srd-muted">Comité de l’Association SR Delémont</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="default">Association</Badge>
          <span className="text-sm text-srd-muted">{identity?.email ?? '—'}</span>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex flex-col gap-1 p-6">
              <span className="font-display text-sm font-bold uppercase tracking-wide text-srd-muted">
                {s.label}
              </span>
              <span className="font-display text-4xl font-black tracking-tight text-srd-yellow">
                {s.value}
              </span>
              <span className="text-xs text-srd-muted">{s.hint}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Dernières actualités */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h2 className="mb-4 font-display text-xl font-black uppercase tracking-tight">
              Dernières actualités
            </h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DERNIERES_ACTUS.map((a) => (
                  <TableRow key={a.titre}>
                    <TableCell className="font-medium">{a.titre}</TableCell>
                    <TableCell>
                      <Badge variant={a.statut === 'Publié' ? 'success' : 'muted'}>{a.statut}</Badge>
                    </TableCell>
                    <TableCell className="text-srd-muted">{a.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Raccourcis */}
        <Card>
          <CardContent className="flex flex-col gap-3 p-6">
            <h2 className="font-display text-xl font-black uppercase tracking-tight">Raccourcis</h2>
            {RACCOURCIS.map((r) => (
              <a key={r.href} href={r.href}>
                <Button variant="outline" className="w-full justify-start">
                  {r.label}
                </Button>
              </a>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
