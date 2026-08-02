const variants = {
  accent:
    "text-accent border-[rgba(148,226,213,.35)] bg-[rgba(148,226,213,.09)]",
  purple: "text-purple border-current opacity-[.92]",
  amber: "text-amber border-current opacity-[.92]",
} as const;

export default function Badge({
  variant = "accent",
  children,
}: {
  variant?: keyof typeof variants;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`rounded-[4px] border px-2 py-[2.5px] font-mono text-[11px] whitespace-nowrap ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
