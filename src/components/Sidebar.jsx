import { useState } from "react";
import {
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  PinOff,
  Trash2,
  User,
  Camera,
  X,
} from "lucide-react";

const chats = [
  "React Interview Questions",
  "Node.js Interview Questions",
  "MongoDB Notes",
  "Express API Guide",
  "JWT Authentication",
  "Socket.io Tutorial",
  "React Roadmap",
  "Jest Testing Framework",
];

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState(null);

  const [showProfileModal, setShowProfileModal] =
    useState(false);

  const [user, setUser] = useState({
    displayName: "Bhavika Pandav",
    username: "@bhavika",
    image: "",
  });

  return (
    <>
      <aside
        className="
        w-[260px]
        h-screen
        bg-[#171717]
        border-r
        border-[#2a2a2a]
        flex
        flex-col
        text-white
        "
      >
        {/* Top */}
        <div className="p-3">
          <button
            className="
            w-full
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            bg-[#2f2f2f]
            hover:bg-[#3a3a3a]
            "
          >
            <Plus size={18} />
            New Chat
          </button>

          <button
            className="
            mt-2
            w-full
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            hover:bg-[#2f2f2f]
            "
          >
            <Search size={18} />
            Search Chats
          </button>
        </div>

        {/* Scrollable Chat List */}
        <div
          className="
          flex-1
          overflow-y-auto
          px-2
          "
        >
          <p className="text-xs text-gray-400 px-3 mb-2">
            Pinned
          </p>

          {chats.map((chat, index) => (
            <div
              key={index}
              className="
              group
              relative
              flex
              items-center
              justify-between
              px-3
              py-3
              rounded-xl
              hover:bg-[#2f2f2f]
              cursor-pointer
              mb-1
              "
            >
              <span className="truncate text-sm">
                {chat}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();

                  setOpenMenu(
                    openMenu === index
                      ? null
                      : index
                  );
                }}
                className="
                hidden
                group-hover:flex
                p-1
                rounded
                hover:bg-[#404040]
                "
              >
                <MoreHorizontal size={16} />
              </button>

              {openMenu === index && (
                <div
                  className="
                  absolute
                  right-2
                  top-12
                  z-50
                  w-52
                  bg-[#2f2f2f]
                  rounded-xl
                  border
                  border-[#444]
                  shadow-2xl
                  overflow-hidden
                  "
                >
                  <button
                    className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    hover:bg-[#3a3a3a]
                    "
                  >
                    <Pencil size={16} />
                    Rename
                  </button>

                  <button
                    className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    hover:bg-[#3a3a3a]
                    "
                  >
                    <PinOff size={16} />
                    Unpin Chat
                  </button>

                  <button
                    className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-red-500
                    hover:bg-[#3a3a3a]
                    "
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Profile */}
        <div
          className="
          border-t
          border-[#2a2a2a]
          p-3
          "
        >
          <button
            onClick={() =>
              setShowProfileModal(true)
            }
            className="
            w-full
            flex
            items-center
            gap-3
            p-2
            rounded-xl
            hover:bg-[#2f2f2f]
            "
          >
            <div
              className="
              w-10
              h-10
              rounded-full
              overflow-hidden
              bg-green-500
              flex
              items-center
              justify-center
              "
            >
              {user.image ? (
                <img
                  src={user.image}
                  alt=""
                  className="
                  w-full
                  h-full
                  object-cover
                  "
                />
              ) : (
                "B"
              )}
            </div>

            <div className="flex-1 text-left">
              <p className="text-sm font-medium">
                {user.displayName}
              </p>

              <p className="text-xs text-gray-400">
                {user.username}
              </p>
            </div>

            <User size={18} />
          </button>
        </div>
      </aside>

      {/* Profile Modal */}
      {showProfileModal && (
        <ProfileModal
          user={user}
          onClose={() =>
            setShowProfileModal(false)
          }
          onSave={(updatedUser) =>
            setUser(updatedUser)
          }
        />
      )}
    </>
  );
}

function ProfileModal({
  user,
  onClose,
  onSave,
}) {
  const [displayName, setDisplayName] =
    useState(user.displayName);

  const [username, setUsername] =
    useState(user.username);

  const [image, setImage] = useState(
    user.image
  );

  const handleSave = () => {
    onSave({
      displayName,
      username,
      image,
    });

    onClose();
  };

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/70
      flex
      items-center
      justify-center
      z-[999]
      "
    >
      <div
        className="
        w-full
        max-w-md
        bg-[#202123]
        border
        border-[#444]
        rounded-2xl
        p-6
        text-white
        "
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            Edit Profile
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div
              className="
              w-24
              h-24
              rounded-full
              overflow-hidden
              bg-green-500
              flex
              items-center
              justify-center
              "
            >
              {image ? (
                <img
                  src={image}
                  alt=""
                  className="
                  w-full
                  h-full
                  object-cover
                  "
                />
              ) : (
                "B"
              )}
            </div>

            <label
              className="
              absolute
              bottom-0
              right-0
              p-2
              rounded-full
              bg-[#2f2f2f]
              cursor-pointer
              "
            >
              <Camera size={16} />

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file =
                    e.target.files[0];

                  if (file) {
                    setImage(
                      URL.createObjectURL(
                        file
                      )
                    );
                  }
                }}
              />
            </label>
          </div>
        </div>

        {/* Display Name */}
        <div className="mb-4">
          <label className="text-sm block mb-2">
            Display Name
          </label>

          <input
            value={displayName}
            onChange={(e) =>
              setDisplayName(
                e.target.value
              )
            }
            className="
            w-full
            p-3
            rounded-xl
            bg-[#2f2f2f]
            border
            border-[#444]
            outline-none
            "
          />
        </div>

        {/* Username */}
        <div className="mb-6">
          <label className="text-sm block mb-2">
            Username
          </label>

          <input
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
            className="
            w-full
            p-3
            rounded-xl
            bg-[#2f2f2f]
            border
            border-[#444]
            outline-none
            "
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
            px-5
            py-2
            rounded-xl
            bg-[#2f2f2f]
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="
            px-5
            py-2
            rounded-xl
            bg-white
            text-black
            font-medium
            "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}