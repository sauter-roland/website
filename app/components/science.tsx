import Badge from "./ui/badge";
import Card, { CardHead } from "./ui/card";

export default function Science() {
  return (
    <>
      <h2>
        PhD in Natural Science <span className="dim-weak">(Bioinformatics)</span>
      </h2>
      <p className="mt-2.5">
        My research applied mathematical models to biology and medicine &mdash; optimization
        models, network analysis, and statistics over large biological datasets. Much of the
        work was building the pipelines to get there, and releasing them as open-source tools
        others could reuse.
      </p>

      <Card>
        <CardHead>
          <h3>GEMCAT</h3>
          <Badge variant="purple">open source</Badge>
        </CardHead>
        <p className="mt-2">A modeling tool to predict metabolite concentrations.</p>
        <p className="mt-2.5">
          <a href="https://github.com/MolecularBioinformatics/GEMCAT">
            github.com/MolecularBioinformatics/GEMCAT &rarr;
          </a>
        </p>
      </Card>

      <Card>
        <CardHead>
          <h3>Thesis</h3>
          <Badge variant="amber">defended 2025</Badge>
        </CardHead>
        <p className="mt-2">
          <em>
            Metabolites at Genome-Scale: Towards Genome-Scale Modeling Strategies for
            Metabolite Concentrations
          </em>{" "}
          &mdash; defended in 2025 at UiT The Arctic University of Norway in Troms&oslash;.
        </p>
        <p className="mt-2.5">
          <a href="https://hdl.handle.net/11250/3221977">Nasjonalt vitenarkiv &rarr;</a>
        </p>
        <p className="comment mt-3">
          code available on request &mdash; repo is private due to privacy concerns around
          some content
        </p>
      </Card>

      <Card>
        <h3>Publications</h3>
        <p className="mt-2">
          <em>
            GEMCAT &mdash; a new algorithm for gene expression-based prediction of metabolic
            alterations
          </em>
          <br />
          <span className="dim-weak">NAR Genomics and Bioinformatics, 2025</span>
          <br />
          <a href="https://academic.oup.com/nargab/article/7/1/lqaf003/7993917">
            academic.oup.com/nargab &rarr;
          </a>
        </p>
        <p className="mt-3.5">
          <em>
            Accounting for NAD Concentrations in Genome-Scale Metabolic Models Captures
            Important Metabolic Alterations in NAD-Depleted Systems
          </em>
          <br />
          <span className="dim-weak">Metabolites, 2024</span>
          <br />
          <a href="https://www.mdpi.com/2218-273X/14/5/602">mdpi.com/journal/metabolites &rarr;</a>
        </p>
      </Card>

      <Card>
        <h3>Talks</h3>
        <p className="mt-2">
          <em>
            Digital Twins in Systems Medicine: Opportunities and Challenges for Genome-Scale
            Metabolic Models
          </em>{" "}
          &mdash; doctoral trial lecture, UiT, 2025. A topic set by the committee, which
          happened to land exactly between my research and my day job.
        </p>
        <p className="mt-3.5">
          <em>Bridging the gap between process simulators and real data with Hybrid ML</em>{" "}
          &mdash; NorwAI Innovate, 2024.
        </p>
      </Card>

      <Card>
        <h3>Teaching</h3>
        <div className="kicker">UiT The Arctic University of Norway</div>
        <p className="mt-2">
          I designed and taught an introductory Python and software engineering course for life
          scientists, at PhD and master&apos;s level. It is still running.
        </p>
      </Card>

      <Card>
        <CardHead>
          <div>
            <h3>Research visit</h3>
            <div className="kicker">Pacific Northwest National Laboratory, USA</div>
          </div>
          <Badge>2018</Badge>
        </CardHead>
        <p className="mt-2">
          Six months as a guest researcher working on dynamic metabolic models over large
          datasets, and on making those computations efficient enough to be practical.
        </p>
      </Card>
    </>
  );
}
