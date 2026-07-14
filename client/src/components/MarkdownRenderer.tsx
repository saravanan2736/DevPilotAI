import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import java from "react-syntax-highlighter/dist/esm/languages/prism/java";
import c from "react-syntax-highlighter/dist/esm/languages/prism/c";
import cpp from "react-syntax-highlighter/dist/esm/languages/prism/cpp";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import sql from "react-syntax-highlighter/dist/esm/languages/prism/sql";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import markdown from "react-syntax-highlighter/dist/esm/languages/prism/markdown";

SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("js", javascript);

SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("ts", typescript);

SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("tsx", tsx);

SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("py", python);

SyntaxHighlighter.registerLanguage("java", java);

SyntaxHighlighter.registerLanguage("c", c);

SyntaxHighlighter.registerLanguage("cpp", cpp);
SyntaxHighlighter.registerLanguage("c++", cpp);

SyntaxHighlighter.registerLanguage("json", json);

SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("shell", bash);
SyntaxHighlighter.registerLanguage("sh", bash);

SyntaxHighlighter.registerLanguage("sql", sql);

SyntaxHighlighter.registerLanguage("css", css);

SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("md", markdown);

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
          const match = /language-([\w+-]+)/.exec(
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
