import { useState } from "react";
import { ArrowUp } from "lucide-react";

const ChatInput = ({ onSend, disabled }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto px-4 py-2">
      <div className="relative flex items-center bg-[#2f2f2f] rounded-3xl border border-[#3e3e3e] px-4 py-2.5 text-white shadow-xl focus-within:border-[#666] transition duration-200">
        
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Message ChatBot..."
          disabled={disabled}
          className="flex-1 bg-transparent border-none outline-none text-sm py-1 pr-12 pl-2 placeholder-gray-400 text-gray-200 disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={!value.trim() || disabled}
          className="
          absolute
          right-3
          p-2
          rounded-full
          bg-white
          text-black
          hover:bg-gray-200
          disabled:bg-[#444]
          disabled:text-gray-500
          disabled:cursor-not-allowed
          cursor-pointer
          transition-all
          duration-150
          flex
          items-center
          justify-center
          "
        >
          <ArrowUp size={16} className="stroke-[3]" />
        </button>

      </div>
    </form>
  );
};



export default ChatInput;