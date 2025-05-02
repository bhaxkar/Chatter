import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarShimmer from "./SidebarShimmer";
import { useAuthStore } from "../store/useAuthStore";
import { IoMdContacts } from "react-icons/io";

const Sidebar = () => {
  const { users, selectedUser, isUserLoading, setSelectedUser, getUsers } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [ showOnlineOnly, setShowOnlineOnly ]= useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUserLoading) return <SidebarShimmer />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-gray-200 flex flex-col bg-white flex-shrink-0">
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <IoMdContacts className="w-6 h-6 text-blue-600" />
          <span className="font-medium hidden lg:block text-gray-800">
            Contacts
          </span>
        </div>
        <div className="mt-3 hidden lg:flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="w-4 h-4 accent-blue-600 rounded border border-gray-300 focus:ring-2 focus:ring-blue-300"
            />
            <span className="text-sm text-gray-700">Show online only</span>
          </label>

          <span className="text-xs text-gray-500">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-gray-100 transition-colors ${
              selectedUser?._id === user._id
                ? "bg-gray-100 ring-1 ring-gray-200"
                : ""
            }`}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.avatar || "/avatar.png"}
                alt={user.name}
                className="w-12 h-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
              )}
            </div>

            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate text-gray-800">
                {user.name}
              </div>
              <div className="text-sm text-gray-400">
                {onlineUsers?.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}


      </div>
    </aside>
  );
};

export default Sidebar;
