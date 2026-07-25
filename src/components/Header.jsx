import {
  ChevronDown,
  Sparkles,
  PanelLeftClose,
  MoreVertical,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      relative
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
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="
          p-2
          rounded-lg
          hover:bg-[#2f2f2f]
          "
        >
          <MoreVertical size={20} />
        </button>

        {showMenu && (
          <div
            className="
            absolute
            right-0
            top-12
            bg-[#1a1a1a]
            border
            border-[#2a2a2a]
            rounded-lg
            py-2
            w-48
            z-50
            "
          >
            <button
              onClick={() => setShowProfileDialog(true)}
              className="
              w-full
              px-4
              py-2
              text-left
              hover:bg-[#2f2f2f]
              flex
              items-center
              gap-2
              "
            >
              Profile
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("_token");
                navigate("/login");
              }}
              className="
              w-full
              px-4
              py-2
              text-left
              hover:bg-[#2f2f2f]
              flex
              items-center
              gap-2
              text-red-400
              "
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Profile Dialog */}
      {showProfileDialog && (
        <div
          className="
          fixed
          inset-0
          bg-black/50
          flex
          items-center
          justify-center
          z-50
          "
          onClick={() => setShowProfileDialog(false)}
        >
          <div
            className="
            bg-[#1a1a1a]
            border
            border-[#2a2a2a]
            rounded-lg
            p-6
            w-96
            "
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Name</label>
                <p className="text-white">User Name</p>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email</label>
                <p className="text-white">user@example.com</p>
              </div>
            </div>
            <button
              onClick={() => setShowProfileDialog(false)}
              className="
              mt-6
              w-full
              py-2
              bg-[#2f2f2f]
              hover:bg-[#3f3f3f]
              rounded-lg
              "
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;