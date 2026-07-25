import { useState, useEffect, useRef } from "react";

import {
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  PinOff,
  Pin,
  Trash2,
  User,
  Camera,
  X,
  MessageCircle,
} from "lucide-react";

export default function Sidebar({
  activeChatId,
  setActiveChatId,
  conversationList,
  handleMessageList,
  setMessageList,
  handleRenameConversation,
}) {
  const [openMenu, setOpenMenu] = useState(null);
  const activeMenuRef = useRef(null);

  const [showProfileModal, setShowProfileModal] =
    useState(false);

  const [editingChatId, setEditingChatId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const handleRenameSubmit = async (conversationId) => {
    if (!editTitle.trim()) {
      setEditingChatId(null);
      return;
    }
    await handleRenameConversation(conversationId, editTitle);
    setEditingChatId(null);
  };

  const conversations = conversationList?.rows || [];
  const pinnedConversations = conversations.filter(c => c.is_pinned);
  const recentConversations = conversations.filter(c => !c.is_pinned);

  const [user, setUser] = useState({
    displayName: "Bhavika Pandav",
    username: "@bhavika",
    image: "",
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        activeMenuRef.current &&
        !activeMenuRef.current.contains(event.target)
      ) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            onClick={() => {
              setActiveChatId(null);
              setMessageList([]);
            }}
            className="
            w-full
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            bg-[#2f2f2f]
            hover:bg-[#3a3a3a]
            cursor-pointer
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
          py-2
          "
        >
          {/* Pinned Section */}
          {pinnedConversations.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-white px-3 mb-2">
                Pinned
              </h3>
              {pinnedConversations.map((conversation, index) => (
                <div
                  key={conversation._id || index}
                  ref={openMenu === conversation._id ? activeMenuRef : null}
                  onClick={() => {
                    if (activeChatId === conversation._id) return;
                    setActiveChatId(conversation._id);
                    handleMessageList(conversation._id);
                  }}
                  className={`
                  group
                  relative
                  flex
                  items-center
                  justify-between
                  px-3
                  py-2
                  rounded-xl
                  cursor-pointer
                  mb-1
                  transition-all
                  duration-200
                  ${activeChatId === conversation._id ? "bg-[#2f2f2f] text-white" : "text-gray-300 hover:bg-[#2f2f2f]/60 hover:text-white"}
                  `}
                >
                  <div className="flex items-center gap-3 overflow-hidden flex-1">
                    <MessageCircle size={18} className="text-gray-300 flex-shrink-0" />
                    {editingChatId === conversation._id ? (
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onBlur={() => handleRenameSubmit(conversation._id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleRenameSubmit(conversation._id);
                          if (e.key === "Escape") setEditingChatId(null);
                        }}
                        autoFocus
                        className="bg-[#3a3a3a] text-white text-sm px-2 py-1 rounded outline-none border border-[#555] w-full"
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <span className="truncate text-sm font-medium">
                        {conversation?.title}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenu(
                        openMenu === conversation._id
                          ? null
                          : conversation._id
                      );
                    }}
                    className={`
                    p-1
                    rounded
                    hover:bg-[#404040]
                    ${openMenu === conversation._id ? "flex" : "hidden group-hover:flex"}
                    `}
                  >
                    <MoreHorizontal size={16} />
                  </button>

                  {openMenu === conversation._id && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="
                      absolute
                      right-2
                      top-10
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
                        onClick={() => {
                          setEditingChatId(conversation._id);
                          setEditTitle(conversation.title);
                          setOpenMenu(null);
                        }}
                        className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        hover:bg-[#3a3a3a]
                        cursor-pointer
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
                        cursor-pointer
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
                        cursor-pointer
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
          )}

          {/* Recents Section */}
          {recentConversations.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-white px-3 mb-2 mt-4">
                Recents
              </h3>
              {recentConversations.map((conversation, index) => (
                <div
                  key={conversation._id || index}
                  ref={openMenu === conversation._id ? activeMenuRef : null}
                  onClick={() => {
                    if (activeChatId === conversation._id) return;
                    setActiveChatId(conversation._id);
                    handleMessageList(conversation._id);
                  }}
                  className={`
                  group
                  relative
                  flex
                  items-center
                  justify-between
                  px-3
                  py-2
                  rounded-xl
                  cursor-pointer
                  mb-1
                  transition-all
                  duration-200
                  ${activeChatId === conversation._id ? "bg-[#2f2f2f] text-white" : "text-gray-300 hover:bg-[#2f2f2f]/60 hover:text-white"}
                  `}
                >
                  <div className="flex items-center gap-3 overflow-hidden flex-1">
                    {editingChatId === conversation._id ? (
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onBlur={() => handleRenameSubmit(conversation._id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleRenameSubmit(conversation._id);
                          if (e.key === "Escape") setEditingChatId(null);
                        }}
                        autoFocus
                        className="bg-[#3a3a3a] text-white text-sm px-2 py-1 rounded outline-none border border-[#555] w-full"
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <span className="truncate text-sm font-medium">
                        {conversation?.title}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenu(
                        openMenu === conversation._id
                          ? null
                          : conversation._id
                      );
                    }}
                    className={`
                    p-1
                    rounded
                    hover:bg-[#404040]
                    ${openMenu === conversation._id ? "flex" : "hidden group-hover:flex"}
                    `}
                  >
                    <MoreHorizontal size={16} />
                  </button>

                  {openMenu === conversation._id && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="
                      absolute
                      right-2
                      top-10
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
                        onClick={() => {
                          setEditingChatId(conversation._id);
                          setEditTitle(conversation.title);
                          setOpenMenu(null);
                        }}
                        className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        hover:bg-[#3a3a3a]
                        cursor-pointer
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
                        cursor-pointer
                        "
                      >
                        <Pin size={16} />
                        Pin Chat
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
                        cursor-pointer
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
          )}
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