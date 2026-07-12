import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import {
  Bot,
  Bug,
  Code2,
  Database,
  FileText,
  Home,
  Settings,
} from "lucide-react";

type DashboardLayoutProps = {
  children: ReactNode;
};

const navItems = [
  {
    icon: Home,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: Bot,
    label: "AI Chat",
    path: "/chat",
  },
  {
    icon: Bug,
    label: "Error Explainer",
    path: "/debug",
  },
  {
    icon: FileText,
    label: "README Generator",
    path: "/readme",
  },
  {
    icon: Database,
    label: "SQL Generator",
    path: "/sql",
  },
];

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#09090B] text-white">
      <aside className="flex w-64 flex-col border-r border-zinc-800 p-5">
        <div className="flex items-center gap-2">
          <Code2 className="h-6 w-6 text-blue-500" />

          <span className="text-lg font-semibold">
            DevPilot AI
          </span>
        </div>

        <nav className="mt-10 flex flex-1 flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                    isActive
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-white">
          <Settings className="h-5 w-5" />
          Settings
        </button>
      </aside>

      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
