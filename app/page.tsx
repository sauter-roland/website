import Section from "./components/section";
import About from "./components/about";
import Work from "./components/work";
import Projects from "./components/projects";
import Science from "./components/science";
import Reading from "./components/reading";

export default function Home() {
  return (
    <>
      <Section id="about">
        <About />
      </Section>

      <Section id="work">
        <Work />
      </Section>

      <Section id="projects">
        <Projects />
      </Section>

      <Section id="science">
        <Science />
      </Section>

      <Section id="reading">
        <Reading />
      </Section>
    </>
  );
}
