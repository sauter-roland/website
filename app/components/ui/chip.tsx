export default function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-line bg-[rgba(255,255,255,.02)] px-2.5 py-[3.5px] font-mono text-[11.5px] text-fg-dim">
      {children}
    </span>
  );
}
