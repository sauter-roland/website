"use client";

import { contacts, meta, sections } from "@/lib/site";
import { useActiveSectionId } from "./nav-provider";

const label =
  "px-[18px] mb-2.5 font-mono text-[10.5px] tracking-[0.14em] uppercase text-faint-chrome";
/**
 * Colour and border-colour are left out on purpose — Tailwind resolves conflicting utilities
 * by stylesheet order, not by class order, so an active modifier appended to a string that
 * already sets them would silently lose. Each state supplies its own.
 */
const item =
  "flex items-center gap-[9px] py-[5px] pr-[18px] pl-[26px] border-l-2 hover:bg-[rgba(255,255,255,.04)] hover:text-fg";
const itemIdle = "border-l-transparent text-fg-dim";
const itemActive = "border-l-accent bg-[rgba(148,226,213,.08)] text-fg";
const icon = "w-[13px] shrink-0 text-center text-[11px]";

export default function Sidebar() {
  const active = useActiveSectionId();

  return (
    <aside className="sticky top-[38px] h-[calc(100dvh-38px)] w-[236px] shrink-0 self-start overflow-y-auto border-r border-line bg-chrome py-[18px] max-wide:hidden">
      <div className={label}>Explorer</div>
      <nav
        aria-label="File explorer"
        className="mb-[26px] font-mono text-[13px]"
      >
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={section.id === active ? "true" : undefined}
            className={`${item} ${section.id === active ? itemActive : itemIdle}`}
          >
            <span aria-hidden="true" className={`${icon} ${section.iconClass}`}>
              {section.icon}
            </span>
            {section.file}
          </a>
        ))}
      </nav>

      <div className={label} id="contact-label">
        Contact
      </div>
      <ul
        aria-labelledby="contact-label"
        className="mb-[26px] font-mono text-[13px]"
      >
        {contacts.map((contact) => (
          <li key={contact.label}>
            <a
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${item} ${itemIdle}`}
            >
              <span aria-hidden="true" className={`${icon} text-purple`}>
                &#8599;
              </span>
              {contact.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>

      <div className={label}>Meta</div>
      <dl className="px-[18px] font-mono text-[11.5px] leading-[2] text-faint-chrome">
        {meta.map((entry) => (
          <div key={entry.key} className="flex">
            <dt className="w-[38px] shrink-0">{entry.key}</dt>
            <dd className="text-fg-dim">{entry.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
