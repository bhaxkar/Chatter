import { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { FaXmark } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import { MdOutlinePermMedia } from "react-icons/md";
import toast from "react-hot-toast";

const MessageInput = ({ onSendMessage }) => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessages } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessages({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if( fileInputRef.current ) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4 flex-shrink-0">
      {imagePreview && (
        <div className="relative inline-block mb-3">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-1 right-1 bg-gray-900/50 rounded-full p-1 hover:bg-gray-900/75 transition-colors"
            >
              < FaXmark  className="w-4 h-4 text-white"/>
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          className="flex-1 min-h-[44px] px-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        > 
          <MdOutlinePermMedia className="w-5 h-5" />
        </button>

        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <LuSend className="w-5 h-5"/>
        </button>
      </form>
    </div>
  );
};

export default MessageInput;

