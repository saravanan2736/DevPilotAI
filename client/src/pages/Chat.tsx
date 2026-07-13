import { useState } from "react";
import { Bot, Send, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import DashboardLayout from "../layouts/DashboardLayout";

type Message = {
  id: number;
  text: string;
  sender: "user" | "ai";
};

function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSend() {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
    ]);

    const messageToSend = input;

    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: messageToSend,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const aiMessage: Message = {
        id: Date.now() + 1,
        text: data.reply,
        sender: "ai",
      };

      setMessages((currentMessages) => [
        ...currentMessages,
        aiMessage,
      ]);
    } catch (error) {
      console.error(error);

      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "Unable to connect to DevPilot server.",
        sender: "ai",
      };

      setMessages((currentMessages) => [
        ...currentMessages,
        errorMessage,
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-4rem)] flex-col">
        <div>
          <h1 className="text-3xl font-bold">AI Chat</h1>

          <p className="mt-2 text-zinc-400">
            Ask developer questions and get focused AI assistance.
          </p>
        </div>

        <div className="mt-8 flex flex-1 flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/30">
          <div className="flex-1 overflow-y-auto p-6">
            {messages.length === 0 && !isLoading ? (
              <div className="flex h-full items-center justify-center">
                <div className="max-w-md text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                    <Bot className="h-6 w-6 text-blue-500" />
                  </div>

                  <h2 className="mt-4 text-xl font-semibold">
                    How can I help you build?
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    Ask about code, errors, architecture, APIs, or
                    development concepts.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mx-auto flex max-w-3xl flex-col gap-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className="flex items-start gap-3"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                      {message.sender === "user" ? (
                        <User className="h-5 w-5 text-blue-500" />
                      ) : (
                        <Bot className="h-5 w-5 text-blue-500" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
                      {message.sender === "ai" ? (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            h1: ({ children }) => (
                              <h1 className="mb-3 mt-4 text-2xl font-bold text-white">
                                {children}
                              </h1>
                            ),
                            h2: ({ children }) => (
                              <h2 className="mb-3 mt-4 text-xl font-bold text-white">
                                {children}
                              </h2>
                            ),
                            h3: ({ children }) => (
                              <h3 className="mb-2 mt-4 text-lg font-semibold text-white">
                                {children}
                              </h3>
                            ),
                            p: ({ children }) => (
                              <p className="mb-3 text-sm leading-7 text-zinc-200">
                                {children}
                              </p>
                            ),
                            ul: ({ children }) => (
                              <ul className="mb-3 list-disc space-y-1 pl-6 text-sm text-zinc-200">
                                {children}
                              </ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="mb-3 list-decimal space-y-1 pl-6 text-sm text-zinc-200">
                                {children}
                              </ol>
                            ),
                            strong: ({ children }) => (
                              <strong className="font-semibold text-white">
                                {children}
                              </strong>
                            ),
                            code: ({ children, className }) => {
                              const isCodeBlock = className?.startsWith(
                                "language-"
                              );

                              if (isCodeBlock) {
                                return (
                                  <code className="block overflow-x-auto rounded-lg bg-zinc-950 p-4 font-mono text-sm text-zinc-200">
                                    {children}
                                  </code>
                                );
                              }

                              return (
                                <code className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-sm text-blue-300">
                                  {children}
                                </code>
                              );
                            },
                            pre: ({ children }) => (
                              <pre className="mb-4 overflow-x-auto">
                                {children}
                              </pre>
                            ),
                          }}
                        >
                          {message.text}
                        </ReactMarkdown>
                      ) : (
                        <p className="whitespace-pre-wrap text-sm leading-6 text-zinc-200">
                          {message.text}
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                      <Bot className="h-5 w-5 text-blue-500" />
                    </div>

                    <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
                      <p className="text-sm text-zinc-400">
                        DevPilot is thinking...
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="border-t border-zinc-800 p-4">
            <div className="mx-auto flex max-w-3xl items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSend();
                  }
                }}
                placeholder="Ask DevPilot anything..."
                className="flex-1 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-500"
              />

              <button
                onClick={handleSend}
                disabled={isLoading}
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-500 text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Chat;
