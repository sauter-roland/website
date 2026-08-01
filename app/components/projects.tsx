const lines = [
  { n: 1, add: false, text: "$ ls ~/vps/staging" },
  { n: 2, add: true, text: "+ project-a/    in development" },
  { n: 3, add: true, text: "+ project-b/    in development" },
  { n: 4, add: false, text: "  2 directories, not yet public" },
];

export default function Projects() {
  return (
    <>
      <h2>Coming soon&hellip;</h2>
      <p className="mt-2">
        The VPS this website is hosted on serves as the staging ground for some projects.
        Currently these are still under development.
      </p>

      <div className="mt-4 overflow-hidden rounded-[7px] border border-line font-mono text-[13px]">
        <div className="border-b border-line bg-chrome px-[14px] py-[7px] text-[11.5px] text-faint-chrome">
          projects/ &mdash; status
        </div>
        {lines.map((line) => (
          <div
            key={line.n}
            className={`flex gap-3 px-[14px] py-[3px] ${
              line.add ? "bg-[rgba(166,227,161,.09)] text-green" : "text-fg-faint"
            }`}
          >
            <span aria-hidden="true" className="w-[22px] shrink-0 text-right text-ghost">
              {line.n}
            </span>
            <span>{line.text}</span>
          </div>
        ))}
      </div>
    </>
  );
}
