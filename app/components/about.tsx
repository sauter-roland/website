import Image from "next/image";
import Chip from "./ui/chip";

const facts = [
  { key: "location", value: "Oslo, Norway" },
  { key: "current", value: "Kongsberg Digital" },
  { key: "education", value: "PhD, Bioinformatics" },
  { key: "focus", value: "optimization, data, AI" },
];

const skills = [
  "Python",
  "TypeScript",
  "Optimization",
  "Data Engineering",
  "Systems Biology",
  "LLM Integration",
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
        These days I am a software engineer at Kongsberg Digital working on everything from
        optimizations that save customers millions of kroners, to work processes that improve
        maintenance and safety, to AI integrations that inform busy engineers.
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
        {skills.map((skill) => (
          <Chip key={skill}>{skill}</Chip>
        ))}
      </div>
    </>
  );
}
