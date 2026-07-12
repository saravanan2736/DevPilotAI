import { Code2, Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative px-6 py-5 md:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 className="h-7 w-7 shrink-0 text-blue-500" />

          <span className="whitespace-nowrap text-xl font-semibold text-white">
            DevPilot AI
          </span>
        </div>

        <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
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

        <button
          className="text-white md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute left-6 right-6 top-20 z-50 flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-zinc-400 md:hidden">
          <a className="transition hover:text-white" href="#">
            Features
          </a>

          <a className="transition hover:text-white" href="#">
            About
          </a>

          <button className="rounded-lg bg-white px-4 py-2 font-medium text-black">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
