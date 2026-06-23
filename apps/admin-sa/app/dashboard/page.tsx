export const runtime = 'edge'; // Cloudflare Pages (next-on-pages) — SSR sur runtime Edge

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

// NOTE: chiffres provisoires — à remplacer par des requêtes @srd/db (schema-sa).
const STATS = [
  { label: 'Affluence moyenne', value: '1 840', hint: 'spectateurs / match' },
  { label: 'Revenus loges', value: 'CHF 248k', hint: 'saison en cours' },
  { label: 'Sponsors actifs', value: '34', hint: '3 contrats en négociation' },
  { label: 'Abonnements', value: '612', hint: '+8% vs N-1' },
];

const PROCHAINES_ECHEANCES = [
  { libelle: 'Contrat sponsor principal', type: 'Renouvellement', date: '30.06.2026' },
  { libelle: 'Accréditations presse — Bavois', type: 'Validation', date: '27.06.2026' },
  { libelle: 'Loge 4 — facturation', type: 'Paiement', date: '01.07.2026' },
];

const RACCOURCIS = [
  { label: 'Effectif 1ère équipe', href: '/equipe-premiere' },
  { label: 'Sponsors & contrats', href: '/sponsors' },
  { label: 'Loges', href: '/loges' },
  { label: 'Accréditations presse', href: '/accreditations' },
];

export default async function DashboardPage() {
  const identity = await getAdminIdentity();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-black uppercase tracking-tight">Dashboard</h1>
          <p className="text-sm text-srd-muted">Direction SRD SA — 1ère Ligue</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline">SRD SA · Pro</Badge>
          <span className="text-sm text-srd-muted">{identity?.email ?? '—'}</span>
        </div>
      </div>

      {/* Chiffres pro */}
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
        {/* Échéances */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h2 className="mb-4 font-display text-xl font-black uppercase tracking-tight">
              Prochaines échéances
            </h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Objet</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PROCHAINES_ECHEANCES.map((e) => (
                  <TableRow key={e.libelle}>
                    <TableCell className="font-medium">{e.libelle}</TableCell>
                    <TableCell>
                      <Badge variant="muted">{e.type}</Badge>
                    </TableCell>
                    <TableCell className="text-srd-muted">{e.date}</TableCell>
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
