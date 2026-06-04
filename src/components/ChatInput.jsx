import { Send } from "lucide-react";

const ChatInput = () => {
  return (
    <div className="p-5">

      <div className="relative max-w-4xl mx-auto">

        <input
          type="text"
          placeholder="Ask anything..."
          className="chat-input"
        />

        <button
          className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          bg-white
          text-black
          p-2
          rounded-full
          "
        >
          <Send size={16} />
        </button>

      </div>

    </div>
  );
};

export default ChatInput;