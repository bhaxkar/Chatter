import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { formatMessageTime } from "../lib/utils.js";

import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import MessageShimmer from "./MessageShimmer.jsx";

const ChatContainer = () => {
  const { authUser, isValidatingAuth } = useAuthStore();
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessage, unSubscribeFromMessage } =
    useChatStore();
  const messageEndRef = useRef(null);

  useEffect(() => {

    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }

    subscribeToMessage();

    return () => unSubscribeFromMessage();
  }, [selectedUser?._id, getMessages, subscribeToMessage, unSubscribeFromMessage]);

  useEffect(() => {
    if(messageEndRef.current && messages){
      messageEndRef.current.scrollIntoView({behavior : "smooth"});
    }
  }, [messages])

  if (isValidatingAuth || !authUser?._id) {
    return (
      <div className="flex flex-col h-full">
        <ChatHeader />
        <MessageShimmer />
        <MessageInput />
      </div>
    );
  }

  if (isMessagesLoading) {
    return (
      <div className="flex flex-col h-full">
        <ChatHeader />
        <MessageShimmer />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        <div className="flex flex-col px-4 py-3 space-y-5">
          {messages.map((message) => {
            const isSender = message.senderId === authUser._id;
            const avatarSrc = isSender
              ? authUser.avatar || "/avatar.png"
              : selectedUser.avatar || "/avatar.png";

            return (
              <div
                key={message._id}
                className={`flex ${isSender ? "justify-end" : "justify-start"}`}
                ref={messageEndRef}
              >
                <div
                  className={`flex items-end gap-2 max-w-[75%] ${
                    isSender ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div className="w-8 h-8 flex-shrink-0 rounded-full overflow-hidden border bg-gray-200">
                    <img
                      src={avatarSrc}
                      alt="user avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <div
                      className={`text-sm px-4 py-2 rounded-xl shadow-sm whitespace-pre-line break-words ${
                        isSender
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-white text-gray-800 border rounded-bl-none"
                      }`}
                    >
                      {message.image && (
                        <img
                          src={message.image}
                          alt="attachment"
                          className="w-full max-w-[220px] rounded-md mb-2"
                          loading="lazy"
                        />
                      )}
                      {message.text && <p>{message.text}</p>}
                    </div>
                    <time
                      className={`text-xs text-gray-500 ${
                        isSender ? "text-right pr-1" : "text-left pl-1"
                      }`}
                    >
                      {formatMessageTime(message.createdAt)}
                    </time>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
