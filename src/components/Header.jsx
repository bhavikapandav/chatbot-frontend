import {
  ChevronDown,
  Sparkles,
  PanelLeftClose,
} from "lucide-react";

const Header = () => {
  return (
    <header
      className="
      h-14
      border-b
      border-[#2a2a2a]
      flex
      items-center
      justify-between
      px-4
      bg-black
      "
    >
      {/* Left Side */}
      <div className="flex items-center gap-3">
        {/* <button
          className="
          p-2
          rounded-lg
          hover:bg-[#2f2f2f]
          "
        >
          <PanelLeftClose size={20} />
        </button> */}

        <button
          className="
          flex
          items-center
          gap-1
          text-lg
          font-semibold
          px-2
          py-1
          rounded-lg
          "
        >
          ChatBot
          
        </button>
      </div>

      {/* Right Side */}
      {/* <button
        className="
        flex
        items-center
        gap-2
        px-4
        py-2
        rounded-full
        border
        border-[#2f2f2f]
        hover:bg-[#2f2f2f]
        "
      >
        <Sparkles size={16} />
        Upgrade
      </button> */}
    </header>
  );
};

export default Header;