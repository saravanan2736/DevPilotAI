import { Code2 } from "lucide-react";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5">
      <div className="flex items-center gap-2">
        <Code2 className="h-7 w-7 text-blue-500" />

        <span className="text-xl font-semibold text-white">
          DevPilot AI
        </span>
      </div>

      <div className="flex items-center gap-8 text-sm text-zinc-400">
        <a className="transition hover:text-white" href="#">
          Features
        </a>

        <a className="transition hover:text-white" href="#">
          About
        </a>

        <button className="rounded-lg bg-white px-4 py-2 font-medium text-black transition hover:bg-zinc-200">
          Get Started
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
