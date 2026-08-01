export default function Card({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`mt-4 rounded-[7px] border border-line bg-[rgba(255,255,255,.014)] px-[22px] py-5 transition-[border-color,background] duration-[160ms] hover:border-fg-faint hover:bg-[rgba(255,255,255,.03)] ${className}`}
    >
      {children}
    </div>
  );
}

/** Title row of a card: heading on the left, badge on the right. */
export function CardHead({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-4">
      {children}
    </div>
  );
}
