export function SectionTitle({ surtitre, titre }: { surtitre: string; titre: string }) {
  return (
    <div className="mb-8 flex flex-col gap-1">
      <span className="font-display text-sm font-bold uppercase tracking-widest text-accent">
        {surtitre}
      </span>
      <h2 className="font-display text-3xl font-black uppercase tracking-tight sm:text-4xl">
        {titre}
      </h2>
    </div>
  );
}
