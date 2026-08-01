/**
 * Single source of truth for the section chrome. The sidebar tree, the tab bar, the prompt
 * line above each section and the line-number gutters all read from `sections`, so adding a
 * section means editing this file and rendering one more `<Section>` in `app/page.tsx`.
 */

export type SectionId = "about" | "work" | "projects" | "science" | "reading";

export type Section = {
  id: SectionId;
  /** file name shown in the sidebar tree and on the tab */
  file: string;
  /** uppercase label above the heading */
  tag: string;
  /** decorative file-type glyph — always rendered aria-hidden */
  icon: string;
  /** Tailwind text-colour class for the glyph */
  iconClass: string;
  /** command shown after the `❯` in the prompt line */
  command: string;
  /** how many line numbers the gutter draws — decorative, matched to the mockup */
  lines: number;
};

export const sections: Section[] = [
  {
    id: "about",
    file: "about.tsx",
    tag: "about",
    icon: "◆",
    iconClass: "text-accent",
    command: "cat about.md",
    lines: 18,
  },
  {
    id: "work",
    file: "work.py",
    tag: "work experience",
    icon: "◆",
    iconClass: "text-accent",
    command: "cat work.md",
    lines: 22,
  },
  {
    id: "projects",
    file: "projects.sh",
    tag: "projects",
    icon: "▪",
    iconClass: "text-green",
    command: "ls -la projects/",
    lines: 12,
  },
  {
    id: "science",
    file: "science.tex",
    tag: "scientific background",
    icon: "◼",
    iconClass: "text-amber",
    command: "python science.py",
    lines: 18,
  },
  {
    id: "reading",
    file: "reading.md",
    tag: "reading",
    icon: "▤",
    iconClass: "text-fg-faint",
    command: "less reading.md",
    lines: 16,
  },
];

export const contacts = [
  { label: "github", href: "https://github.com/sauter-roland" },
  { label: "linkedin", href: "https://www.linkedin.com/in/roland-sauter/" },
];

export const meta = [
  { key: "loc", value: "Oslo, NO" },
  { key: "tz", value: "CET / UTC+1" },
  { key: "role", value: "Staff Engineer" },
];
