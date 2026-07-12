import {
  Bot,
  Bug,
  Code2,
  FileText,
  Database,
  Braces,
} from "lucide-react";
import FeatureCard from "./FeatureCard";

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
          {features.map((feature,index) => (
		<FeatureCard
    key={feature.title}
    icon={feature.icon}
    title={feature.title}
    description={feature.description}
    delay={index* 0.1}
  />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
