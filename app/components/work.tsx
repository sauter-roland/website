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
          <li>Optimization approaches</li>
          <li>End-to-end data science and data engineering</li>
          <li>Collaboration across disciplines, backgrounds, and cultures</li>
        </BulletList>
      </Card>

      <Card>
        <CardHead>
          <div>
            <h3>Software Engineer &rarr; Senior &rarr; Staff Engineer</h3>
            <div className="kicker">Kongsberg Digital</div>
          </div>
          <Badge>09/2021 &mdash; present</Badge>
        </CardHead>
        <BulletList>
          <li>Led efforts in diverse software engineering and data science projects</li>
          <li>
            <a href="https://kongsbergdigital.com/customer-stories/shell-ormen-lange">
              Led production optimization saving millions of kroners
            </a>{" "}
            and powering thousands of additional UK households
          </li>
          <li>Hired and mentored many junior developers, helping to build the team</li>
          <li>Architected AI-enabled work process management system</li>
        </BulletList>
      </Card>
    </>
  );
}
