import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { FaXmark } from "react-icons/fa6";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="bg-white border-b border-gray-200 py-3 px-4 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={selectedUser.avatar || "/avatar.png"}
              alt={selectedUser.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {onlineUsers.includes(selectedUser._id) && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
            )}
          </div>
          
          <div className="flex flex-col">
            <h3 className="font-medium text-gray-900 line-clamp-1">
              {selectedUser.name}
            </h3>
            <span className="text-sm text-gray-500">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        <button
          onClick={() => setSelectedUser(null)}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close chat"
        >
          <FaXmark className="w-5 h-5"/>
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;


