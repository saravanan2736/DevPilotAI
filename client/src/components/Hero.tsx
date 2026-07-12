import { ArrowRight } from "lucide-react";

function Hero() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        <p className="mb-4 text-sm font-medium text-blue-500">
          AI-powered developer workspace
        </p>

        <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl">
          Build faster.
          <br />
          Debug smarter.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
          Review code, understand errors, and generate developer essentials
          with one intelligent workspace.
        </p>

        <button className="mx-auto mt-8 flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200">
          Start building
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}

export default Hero;
