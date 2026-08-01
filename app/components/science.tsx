import Badge from "./ui/badge";
import Card, { CardHead } from "./ui/card";

export default function Science() {
  return (
    <>
      <h2>
        PhD in Natural Science <span className="dim-weak">(Bioinformatics)</span>
      </h2>

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
    </>
  );
}
