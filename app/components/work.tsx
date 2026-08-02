import BulletList from "./ui/bullet-list";
import Badge from "./ui/badge";
import Card, { CardHead } from "./ui/card";

export default function Work() {
  return (
    <>
      <h2>Core skills</h2>
      <p className="comment mb-2.5">
        data scientist &amp; software engineer with broad competences, and a fast learner
      </p>

      <Card>
        <BulletList>
          <li>Optimization &mdash; linear, nonlinear, and integer programming on real production problems</li>
          <li>End-to-end data science and data engineering, from pipeline to deployed model</li>
          <li>Turning ill-defined problems into shipped systems, usually alongside the customer</li>
          <li>Collaboration across disciplines, backgrounds, and cultures</li>
        </BulletList>
      </Card>

      <Card>
        <CardHead>
          <div>
            <h3>Software Engineer &rarr; Senior &rarr; Staff Engineer</h3>
            <div className="kicker">Kongsberg Digital (Falkor)</div>
          </div>
          <Badge>09/2021 &mdash; 08/2026</Badge>
        </CardHead>
        <BulletList>
          <li>
            Optimization of production and planning &mdash;{" "}
            <a href="https://kongsbergdigital.com/customer-stories/shell-ormen-lange">
              MEG optimization for Shell at Ormen Lange
            </a>{" "}
            replaced a manual spreadsheet process with a nonlinear model, saving millions of
            kroner and powering thousands of additional UK households, and later optimization
            work for ADNOC
          </li>
          <li>
            Built features across an industrial digital twin &mdash; time-series analytics,
            predictive maintenance, and later the platform team for generative AI
          </li>
          <li>
            Designed the domain model and technical architecture for a fault-finding workflow,
            spanning configurable user personas, role-based access control, and notifications
          </li>
          <li>
            Contributed to the integrated industrial AI copilot &mdash; answer-quality
            evaluation, consent and prompt analytics, and multi-modal prototypes &mdash; and
            built an AI-assisted inspection follow-up workflow for V&aring;r Energi
          </li>
          <li>Led multiple teams of summer interns building computer vision and RAG tooling</li>
          <li>Ran the group&apos;s CI/CD and Kubernetes deployments on Azure using Helm</li>
          <li>Hired and mentored many junior developers, and stood in as interim department manager</li>
          <li>
            Employee representative on the board of directors (2025-2026), and Tekna
            representative (2022-2026)
          </li>
        </BulletList>
      </Card>
    </>
  );
}
