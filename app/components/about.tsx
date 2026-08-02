import Image from "next/image";
import Chip from "./ui/chip";

const facts = [
  { key: "location", value: "Oslo, Norway" },
  { key: "education", value: "PhD, Bioinformatics" },
  { key: "languages", value: "German, English, Norwegian" },
  { key: "focus", value: "optimization, data, AI" },
];

/** Broad domains — the concrete toolchain lives in the stack section. */
const domains = [
  "Optimization",
  "Data Engineering",
  "Machine Learning",
  "Digital Twins",
  "Systems Biology",
  "AI and Copilot",
];

export default function About() {
  return (
    <>
      <h1>
        Hi! I&apos;m Roland Sauter.
        <span aria-hidden="true" className="cursor" />
      </h1>

      <p className="lead">
        I&apos;m a software engineer, (data) scientist, and generally a nerd based in Oslo,
        Norway. This is my first attempt at a personal website, so expect it to evolve over
        time.
      </p>
      <p className="lead">
        These days I work at the intersection of software engineering, data science, and
        optimization: everything from models that save customers millions of kroner, to work
        processes that improve maintenance and safety, to AI integrations that inform busy
        engineers.
      </p>
      <p className="lead">
        The problems I enjoy most are the ones that start out ill-defined &mdash; where the
        customer is not yet sure what they need, or someone else has already called it
        impossible. Most of what makes that work is explaining complicated things clearly and
        being comfortable across disciplines, languages, and cultures.
      </p>

      <div className="mt-[34px] flex flex-wrap items-start gap-[30px]">
        <Image
          src="/profile.jpg"
          alt="Roland Sauter"
          width={148}
          height={148}
          priority
          className="size-[148px] shrink-0 rounded-lg border border-line object-cover saturate-[.92]"
        />
        <dl className="font-mono text-[12.5px] leading-[2.15] text-fg-dim">
          {facts.map((fact) => (
            <div key={fact.key} className="flex">
              <dt className="w-[104px] shrink-0 text-fg-faint">{fact.key}</dt>
              <dd className="text-fg">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-4 flex flex-wrap gap-[7px]">
        {domains.map((domain) => (
          <Chip key={domain}>{domain}</Chip>
        ))}
      </div>
    </>
  );
}
