import { useState } from "react";
import {
  Bug,
  LoaderCircle,
  Sparkles,
} from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import MarkdownRenderer from "../components/MarkdownRenderer";

function ErrorExplainer() {
  const [errorMessage, setErrorMessage] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleExplain() {
    if (!errorMessage.trim() || isLoading) return;

    setIsLoading(true);
    setExplanation("");

    try {
      const response = await fetch(
        "http://localhost:3000/api/explain-error",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            errorMessage,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to explain error");
      }

      const data = await response.json();

      setExplanation(data.explanation);
    } catch (error) {
      console.error(error);

      setExplanation(
        "DevPilot AI is temporarily unavailable. Please try again shortly."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl">
        <div>
          <h1 className="text-3xl font-bold">
            Error Explainer
          </h1>

          <p className="mt-2 text-zinc-400">
            Paste a developer error and let DevPilot explain the
            problem and possible fix.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
            <div className="flex items-center gap-2">
              <Bug className="h-5 w-5 text-blue-500" />

              <h2 className="font-semibold">
                Error input
              </h2>
            </div>

            <textarea
              value={errorMessage}
              onChange={(event) =>
                setErrorMessage(event.target.value)
              }
              placeholder="Paste your error message or stack trace here..."
              className="mt-5 min-h-[420px] w-full resize-none rounded-lg border border-zinc-800 bg-zinc-950 p-4 font-mono text-sm leading-6 text-zinc-200 outline-none transition placeholder:text-zinc-600 focus:border-blue-500"
            />

            <button
              onClick={handleExplain}
              disabled={!errorMessage.trim() || isLoading}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-3 font-medium text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                  Analyzing error...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Explain error
                </>
              )}
            </button>
          </section>

          <section className="min-w-0 rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
            <h2 className="font-semibold">
              DevPilot explanation
            </h2>

            <div className="mt-5 min-h-[480px] min-w-0 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 p-5">
              {!explanation && !isLoading ? (
                <div className="flex min-h-[430px] items-center justify-center text-center">
                  <div>
                    <Bug className="mx-auto h-8 w-8 text-zinc-700" />

                    <p className="mt-3 text-sm text-zinc-500">
                      Your error explanation will appear here.
                    </p>
                  </div>
                </div>
              ) : isLoading ? (
                <div className="flex min-h-[430px] items-center justify-center">
                  <div className="text-center">
                    <LoaderCircle className="mx-auto h-7 w-7 animate-spin text-blue-500" />

                    <p className="mt-3 text-sm text-zinc-500">
                      DevPilot is analyzing your error...
                    </p>
                  </div>
                </div>
              ) : (
                <MarkdownRenderer content={explanation} />
              )}
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ErrorExplainer;
