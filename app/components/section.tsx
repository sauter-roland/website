import { type SectionId, sections } from "@/lib/site";
import PromptLine from "./prompt-line";

/**
 * Wraps a section in the editor chrome: line-number gutter, prompt line and uppercase tag.
 * Everything but the children is derived from `lib/site.ts`, so a section only ever declares
 * its id.
 */
export default function Section({
  id,
  children,
}: {
  id: SectionId;
  children: React.ReactNode;
}) {
  const section = sections.find((s) => s.id === id);
  if (!section) throw new Error(`Unknown section id: ${id}`);

  const isLast = sections[sections.length - 1].id === id;

  return (
    <section
      id={id}
      className={`flex pt-[52px] pb-[60px] ${isLast ? "" : "border-b border-line-soft"}`}
    >
      {/* decorative: line numbers carry no meaning and must not be read aloud (§7.4) */}
      <div
        aria-hidden="true"
        className="w-[62px] shrink-0 pr-5 text-right font-mono text-[12px] leading-[1.65] text-ghost select-none max-wide:hidden"
      >
        {Array.from({ length: section.lines }, (_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>

      <div className="content min-w-0 flex-1 max-w-[760px] pr-[56px] max-wide:pr-6 max-wide:pl-6">
        <PromptLine command={section.command} />
        <div className="sec-tag">{section.tag}</div>
        {children}
      </div>
    </section>
  );
}
