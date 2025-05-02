import { Link } from "react-router-dom";
import { IoChatboxEllipsesSharp, IoLogOut } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <nav className="bg-white shadow-md py-4 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <IoChatboxEllipsesSharp className="text-blue-600 h-5 w-5" />
          <p className="ml-2 text-xl font-bold text-gray-800">Chatter</p>
        </Link>

        <div className="flex items-center space-x-4">
          {authUser && (
            <>
              <Link 
                to="/profile" 
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                <FaUser className="h-5 w-5 mr-1"/>
                <span className="hidden sm:inline">Profile</span>
              </Link>
              <button 
                onClick={logout} 
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
              > 
                <IoLogOut className="h-5 w-5 mr-1"/>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;