import About from "./components/about";
import Projects from "./components/projects";
import Science from "./components/science";
import Work from "./components/work";

export default function Home() {
  return (
    <main>
      <section id="about">
        <About />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="science">
        <Science />
      </section>

      <section id="work">
        <Work />
      </section>
    </main>
  );
}
