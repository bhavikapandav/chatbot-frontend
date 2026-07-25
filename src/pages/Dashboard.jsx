import { useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import ChatInput from "../components/ChatInput";
import { Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const markdownComponents = {
  h1: ({ children }) => <h1 className="text-2xl font-bold mt-4 mb-2 text-white">{children}</h1>,
  h2: ({ children }) => <h2 className="text-xl font-semibold mt-3 mb-1 text-white">{children}</h2>,
  h3: ({ children }) => <h3 className="text-lg font-medium mt-2 mb-1 text-white">{children}</h3>,
  p: ({ children }) => <p className="mb-2 last:mb-0 text-gray-200">{children}</p>,
  ul: ({ children }) => <ul className="list-disc pl-5 mb-2 text-gray-200">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-5 mb-2 text-gray-200">{children}</ol>,
  li: ({ children }) => <li className="mb-1">{children}</li>,
  blockquote: ({ children }) => <blockquote className="border-l-4 border-purple-500 pl-4 italic my-2 text-gray-400">{children}</blockquote>,
  code: ({ children }) => <code className="bg-[#1e1e1e] px-1.5 py-0.5 rounded text-red-400 font-mono text-xs">{children}</code>,
  pre: ({ children }) => <pre className="bg-[#1e1e1e] p-3 rounded-lg overflow-x-auto text-xs my-2 border border-[#333]">{children}</pre>,
  table: ({ children }) => <table className="w-full border-collapse border border-[#333] my-3 text-xs">{children}</table>,
  thead: ({ children }) => <thead className="bg-[#2f2f2f]">{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => <tr className="border-b border-[#333]">{children}</tr>,
  th: ({ children }) => <th className="border border-[#333] px-3 py-2 text-left font-semibold text-white">{children}</th>,
  td: ({ children }) => <td className="border border-[#333] px-3 py-2 text-gray-300">{children}</td>,
  hr: () => <hr className="border-[#333] my-4" />,
  strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
  a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">{children}</a>
};

const Dashboard = () => {
  const { activeChatId, messageList } = useOutletContext();
  const messages = messageList?.rows || [];

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);


  return (
    <div className="h-full flex flex-col bg-[#212121]">
      {!activeChatId ? (
        // Welcome Screen
        <div className="flex-1 flex flex-col items-center justify-center px-5 max-w-4xl mx-auto w-full">
          <h1 className="text-5xl font-semibold mb-10 text-center tracking-tight text-white/90">
            What's on your mind today?
          </h1>
          <div className="w-full">
            <ChatInput />
          </div>
        </div>
      ) : (
        // Message History Pane
        <div className="flex-1 flex flex-col overflow-hidden relative">

          <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-4xl mx-auto w-full">
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
                      className={`flex gap-4 items-start ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      {!isUser && (
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 shadow-md">
                          <Sparkles size={16} className="text-white" />
                        </div>
                      )}

                      <div
                        className={`
                          max-w-[85%]
                          px-4
                          py-3
                          rounded-2xl
                          text-sm
                          leading-relaxed
                          shadow-sm
                          ${isUser
                            ? "bg-[#2f2f2f] text-white rounded-tr-none"
                            : "bg-[#2f2f2f]/30 border border-[#333] text-gray-200 rounded-tl-none"
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

                      {isUser && (
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-black font-semibold text-xs flex-shrink-0 shadow-md">
                          U
                        </div>
                      )}
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          <div className="border-t border-[#2a2a2a] bg-[#212121] py-4 px-5">
            <div className="max-w-4xl mx-auto w-full">
              <ChatInput />
            </div>
          </div>

        </div>
      )}
    </div>
  );
};



export default Dashboard;