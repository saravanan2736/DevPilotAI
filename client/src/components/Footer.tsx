import { Code2 } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-zinc-800 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <Code2 className="h-5 w-5 text-blue-500" />

          <span className="font-medium text-white">
            DevPilot AI
          </span>
        </div>

        <p className="text-sm text-zinc-500">
          Built for developers who want to move faster.
        </p>

        <p className="text-sm text-zinc-500">
          © 2026 DevPilot AI
        </p>
      </div>
    </footer>
  );
}

export default Footer;
