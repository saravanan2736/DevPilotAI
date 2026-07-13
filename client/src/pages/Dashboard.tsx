import {
  ArrowRight,
  Bot,
  Bug,
  Database,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

const tools = [
  {
    icon: Bot,
    title: "AI Chat",
    description: "Ask developer questions and get focused AI assistance.",
    path: "/chat",
  },
  {
    icon: Bug,
    title: "Error Explainer",
    description: "Understand confusing errors and discover possible fixes.",
    path: "/debug",
  },
  {
    icon: FileText,
    title: "README Generator",
    description: "Generate clean project documentation with AI.",
    path: "/readme",
  },
  {
    icon: Database,
    title: "SQL Generator",
    description: "Turn plain English into structured SQL queries.",
    path: "/sql",
  },
];

function Dashboard() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl">
        <div>
          <h1 className="text-3xl font-bold">
            Developer Dashboard
          </h1>

          <p className="mt-2 text-zinc-400">
            Choose an AI tool and start building.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {tools.map((tool) => {
            const Icon = tool.icon;

            return (
              <Link
                key={tool.path}
                to={tool.path}
                className="group rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 transition hover:border-zinc-700 hover:bg-zinc-900"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
                    <Icon className="h-6 w-6 text-blue-500" />
                  </div>

                  <ArrowRight className="h-5 w-5 text-zinc-600 transition group-hover:translate-x-1 group-hover:text-white" />
                </div>

                <h2 className="mt-5 text-lg font-semibold text-white">
                  {tool.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {tool.description}
                </p>
              </Link>
            );
          })}
        </div>

        <section className="mt-12">
          <h2 className="text-xl font-semibold">
            Recent Activity
          </h2>

          <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900/30 p-8 text-center">
            <p className="text-sm text-zinc-500">
              No recent activity yet. Start using DevPilot tools 🚀
            </p>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
