import Card from "./ui/card";

export default function Reading() {
  return (
    <>
      <h2>Reading that left an impression on me</h2>
      <p className="mt-2.5">
        I enjoy reading about different topics, from technology to history, science to
        philosophy. A few books have left a lasting impression on me, and I&apos;d like to
        share them here.
      </p>

      <Card className="flex gap-1">
        <div className="w-[30px] shrink-0 pt-[3px] font-mono text-[12px] text-fg-faint">
          01
        </div>
        <div>
          <h3>
            Thank You For Arguing <span className="dim-weak">&mdash; Jay Heinrichs</span>
          </h3>
          <p className="mt-1.5">
            Beyond the obvious practice of rhetoric, this book taught me to see the world
            through the lens of persuasion more so than as having to be right. It changed how
            I communicate with others and how I understand them, helping me in a critical
            phase of my life.
          </p>
        </div>
      </Card>

      <Card className="flex gap-1">
        <div className="w-[30px] shrink-0 pt-[3px] font-mono text-[12px] text-fg-faint">
          02
        </div>
        <div>
          <h3>
            Code <span className="dim-weak">&mdash; Charles Petzold</span>
          </h3>
          <p className="mt-1.5">
            My introduction to the world of computers and information technology.
          </p>
        </div>
      </Card>

      <Card className="flex gap-1">
        <div className="w-[30px] shrink-0 pt-[3px] font-mono text-[12px] text-fg-faint">
          03
        </div>
        <div>
          <h3>
            Politics and the English Language{" "}
            <span className="dim-weak">&mdash; George Orwell</span>
          </h3>
          <p className="mt-1.5">
            Probably the most useful text on writing and language I&apos;ve ever read.
            <br />
            <a href="https://www.orwellfoundation.com/the-orwell-foundation/orwell/essays-and-other-works/politics-and-the-english-language/">
              Read it at the Orwell Foundation &rarr;
            </a>
          </p>
        </div>
      </Card>
    </>
  );
}
