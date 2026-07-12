import {
  Bot,
  Bug,
  Code2,
  FileText,
  Database,
  Braces,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Chat",
    description: "Get developer-focused answers and coding guidance.",
  },
  {
    icon: Code2,
    title: "Code Review",
    description: "Analyze code and discover bugs and improvements.",
  },
  {
    icon: Bug,
    title: "Error Explainer",
    description: "Turn confusing errors into clear explanations.",
  },
  {
    icon: FileText,
    title: "README Generator",
    description: "Create clean documentation for your projects.",
  },
  {
    icon: Database,
    title: "SQL Generator",
    description: "Convert plain English into structured SQL queries.",
  },
  {
    icon: Braces,
    title: "Code Converter",
    description: "Convert code between programming languages.",
  },
];

function Features() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-medium text-blue-500">
            Developer toolkit
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">
            Everything you need to build.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition hover:border-zinc-700"
              >
                <Icon className="h-6 w-6 text-blue-500" />

                <h3 className="mt-5 text-lg font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-2 leading-7 text-zinc-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;
