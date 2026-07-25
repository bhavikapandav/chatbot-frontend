import { useEffect, useRef, lazy, Suspense } from "react";
import { useOutletContext } from "react-router-dom";
import ChatInput from "../components/ChatInput";
import { Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const CodeBlock = lazy(() => import("../components/CodeBlock"));

const markdownComponents = {
  h1: ({ children }) => <h1 className="text-2xl font-bold mt-6 mb-3 text-white tracking-tight">{children}</h1>,
  h2: ({ children }) => <h2 className="text-xl font-semibold mt-5 mb-2 text-white tracking-tight">{children}</h2>,
  h3: ({ children }) => <h3 className="text-lg font-medium mt-4 mb-2 text-white">{children}</h3>,
  p: ({ children }) => <p className="mb-4 last:mb-0 text-gray-200 leading-relaxed">{children}</p>,
  ul: ({ children }) => <ul className="list-disc pl-6 mb-4 text-gray-200 space-y-1.5">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 text-gray-200 space-y-1.5">{children}</ol>,
  li: ({ children }) => <li className="mb-0.5">{children}</li>,
  blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-500 pl-4 italic my-4 text-gray-400 bg-white/5 py-1 rounded-r">{children}</blockquote>,
  code({ className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    const inline = !match;
    if (inline) {
      return (
        <code className="bg-[#2f2f2f] px-1.5 py-0.5 rounded text-rose-400 font-mono text-xs" {...props}>
          {children}
        </code>
      );
    }
    const language = match[1];
    return (
      <Suspense fallback={<div className="h-20 bg-[#1e1e1e] animate-pulse rounded-xl" />}>
        <CodeBlock language={language} value={String(children).replace(/\n$/, "")} />
      </Suspense>
    );
  },
  pre: ({ children }) => <>{children}</>,
  table: ({ children }) => (
    <div className="overflow-x-auto my-4 rounded-xl border border-[#3e3e3e]">
      <table className="w-full border-collapse text-left text-xs">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-[#2f2f2f] border-b border-[#3e3e3e] text-white font-medium">{children}</thead>,
  tbody: ({ children }) => <tbody className="divide-y divide-[#3e3e3e]">{children}</tbody>,
  tr: ({ children }) => <tr className="hover:bg-white/5 transition duration-150">{children}</tr>,
  th: ({ children }) => <th className="px-4 py-3 font-semibold">{children}</th>,
  td: ({ children }) => <td className="px-4 py-3 text-gray-300">{children}</td>,
  hr: () => <hr className="border-[#3e3e3e] my-6" />,
  strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,

  a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">{children}</a>
};

const Dashboard = () => {
  const {
    activeChatId,
    messageList,
    sendMessage,
    isSendingMessage
  } = useOutletContext();
  const messages = messageList?.rows || [];

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);


  return (
    <div className="h-full flex flex-col bg-[#212121] w-full">
      {!activeChatId ? (
        // Welcome Screen
        <div className="flex-1 flex flex-col items-center justify-center px-6 w-full">
          <h1 className="text-5xl font-semibold mb-10 text-center tracking-tight text-white/90">
            What's on your mind today?
          </h1>
          <div className="w-full max-w-3xl">
            <ChatInput onSend={sendMessage} disabled={isSendingMessage} />
          </div>
        </div>
      ) : (
        // Message History Pane (using whole screen area properly in ChatGPT style)
        <div className="flex-1 flex flex-col overflow-hidden relative w-full">

          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 w-full">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                No messages yet. Say hello to get started!
              </div>
            ) : (
              <>
                {messages.map((msg) => {
                  const isUser = msg.role === "user";
                  return (
                    <div
                      key={msg._id}
                      className="w-full flex justify-center"
                    >
                      <div className={`w-full max-w-3xl flex gap-4 items-start ${isUser ? "justify-end" : "justify-start"}`}>
                        
                        {/* Bot Avatar */}
                        {!isUser && (
                          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0 shadow-md">
                            <Sparkles size={16} className="text-white" />
                          </div>
                        )}

                        {/* Message content */}
                        <div
                          className={`
                            text-sm
                            leading-relaxed
                            ${isUser
                              ? "max-w-[70%] bg-[#2f2f2f] text-gray-100 rounded-3xl px-5 py-3 shadow-sm"
                              : "flex-1 text-gray-200"
                            }
                          `}
                        >
                          {isUser ? (
                            <div className="whitespace-pre-wrap">{msg.content}</div>
                          ) : (
                            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                              {msg.content}
                            </ReactMarkdown>
                          )}
                        </div>

                        {/* User Avatar */}
                        {isUser && (
                          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold text-xs flex-shrink-0 shadow-md">
                            U
                          </div>
                        )}

                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          <div className="border-t border-white/5 bg-[#212121] py-4 px-6 w-full">
            <div className="w-full">
              <ChatInput onSend={sendMessage} disabled={isSendingMessage} />
            </div>
          </div>

        </div>
      )}
    </div>
  );
};




export default Dashboard;