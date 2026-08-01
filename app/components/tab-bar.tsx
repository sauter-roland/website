"use client";

import { sections } from "@/lib/site";
import { useActiveSectionId } from "./nav-provider";

export default function TabBar() {
  const active = useActiveSectionId();

  return (
    <nav
      aria-label="Sections"
      className="no-scrollbar sticky top-[38px] z-50 flex overflow-x-auto border-b border-line bg-panel"
    >
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          aria-current={section.id === active ? "true" : undefined}
          className={`border-r border-line px-4 py-[9px] font-mono text-[12.5px] whitespace-nowrap ${
            section.id === active
              ? "bg-bg text-fg shadow-[inset_0_2px_0_var(--color-accent)]"
              : "text-fg-faint hover:text-fg-dim"
          }`}
        >
          {section.file}
        </a>
      ))}
    </nav>
  );
}
