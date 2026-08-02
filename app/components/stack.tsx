import Card from "./ui/card";
import Chip from "./ui/chip";

const stack = [
  {
    group: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "Julia", "Matlab", "Bash", "LaTeX"],
  },
  {
    group: "Data science and AI",
    items: [
      "Machine learning",
      "Nonlinear optimization",
      "Integer programming",
      "NumPy",
      "scikit-learn",
      "PyTorch",
      "ONNX",
      "LangChain",
      "LangGraph",
      "RAG",
      "LM Studio",
      "Claude",
      "Copilot",
    ],
  },
  {
    group: "Data engineering",
    items: [
      "MongoDB",
      "TimescaleDB",
      "InfluxDB",
      "Qdrant",
      "ETL / ELT",
      "Streaming",
      "Data pipelines",
    ],
  },
  {
    group: "Web",
    items: ["React", "Next.js", "Angular", "Express", "REST APIs"],
  },
  {
    group: "Infrastructure",
    items: ["Docker", "Kubernetes", "Helm", "Azure", "Azure Pipelines", "Linux", "Git"],
  },
  {
    group: "Ways of working",
    items: ["Agile", "Test-driven development", "Code review", "Mentoring"],
  },
];

export default function Stack() {
  return (
    <>
      <h2>My toolbox</h2>
      <p className="comment mb-2.5">
        the most important tools I&apos;m using
      </p>

      {stack.map((entry) => (
        <Card key={entry.group}>
          <h3>{entry.group}</h3>
          <div className="mt-3 flex flex-wrap gap-[7px]">
            {entry.items.map((item) => (
              <Chip key={item}>{item}</Chip>
            ))}
          </div>
        </Card>
      ))}
    </>
  );
}
