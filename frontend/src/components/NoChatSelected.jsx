import { CiChat1 } from "react-icons/ci";

const NoChatSelected = () => {
  return (
    <div className="h-full flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-8">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-blue-600/10 flex items-center justify-center animate-pulse">
                <CiChat1 className="w-10 h-10 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Welcome to Chatter!</h2>
            <p className="text-gray-600">Select a conversation from the sidebar to start chatting</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
