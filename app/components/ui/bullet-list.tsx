/** Accent `▸` bullets. The marker itself is a `::before` in globals.css. */
export default function BulletList({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ul className="bullets">{children}</ul>;
}
