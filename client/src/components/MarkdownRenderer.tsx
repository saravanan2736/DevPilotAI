import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

type MarkdownRendererProps = {
  content: string;
};

function MarkdownRenderer({
  content,
}: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="mb-3 mt-5 text-2xl font-bold text-white first:mt-0">
            {children}
          </h1>
        ),

        h2: ({ children }) => (
          <h2 className="mb-3 mt-5 text-xl font-bold text-white first:mt-0">
            {children}
          </h2>
        ),

        h3: ({ children }) => (
          <h3 className="mb-2 mt-4 text-lg font-semibold text-white">
            {children}
          </h3>
        ),

        p: ({ children }) => (
          <p className="mb-3 text-sm leading-7 text-zinc-300">
            {children}
          </p>
        ),

        ul: ({ children }) => (
          <ul className="mb-4 list-disc space-y-2 pl-6 text-sm leading-6 text-zinc-300">
            {children}
          </ul>
        ),

        ol: ({ children }) => (
          <ol className="mb-4 list-decimal space-y-2 pl-6 text-sm leading-6 text-zinc-300">
            {children}
          </ol>
        ),

        strong: ({ children }) => (
          <strong className="font-semibold text-white">
            {children}
          </strong>
        ),

        code: ({ children, className }) => {
          const match = /language-(\w+)/.exec(
            className || ""
          );

          if (match) {
            return (
              <SyntaxHighlighter
                language={match[1]}
                style={vscDarkPlus}
                PreTag="div"
                customStyle={{
                  margin: 0,
                  borderRadius: "0.5rem",
                }}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            );
          }

          return (
            <code className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-sm text-blue-300">
              {children}
            </code>
          );
        },

        pre: ({ children }) => (
          <div className="mb-4 min-w-0 overflow-x-auto rounded-lg">
            {children}
          </div>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

export default MarkdownRenderer;
