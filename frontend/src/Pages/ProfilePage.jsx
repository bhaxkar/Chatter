import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useProfileStore } from "../store/useProfileStore";
import { FaCamera, FaUser, FaPen } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const ProfilePage = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  const { authUser } = useAuthStore();
  const { isUpdatingAvatar, updateAvatar } = useProfileStore();

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async() => {
      const base64AvatarURL = reader.result;
      setSelectedImg(base64AvatarURL);
      await updateAvatar({avatar: base64AvatarURL})
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 py-16">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
     
          <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 pb-24">
            <h1 className="text-2xl font-bold mb-1">Profile</h1>
            <p className="text-blue-100 text-sm">Manage your account information</p>
          </div>
       
          <div className="relative -mt-16 px-8">
            <div className="relative inline-block">
              <img
                src={selectedImg || authUser.avatar || "/avatar.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-2 right-2
                  bg-blue-600 hover:bg-blue-700
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200 shadow-md
                  ${isUpdatingAvatar ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <FaCamera className="h-5 w-5 text-white"/>
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  disabled={isUpdatingAvatar}
                />
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {isUpdatingAvatar
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Personal Information
                </h2>
                
                <div>
                  <label className="flex items-center text-gray-600 text-sm mb-1 font-medium">
                    <FaUser  className="h-4 w-4 mr-2 text-blue-500"/>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={authUser?.name}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    readOnly
                  />
                </div>

                <div>
                  <label className="flex items-center text-gray-600 text-sm mb-1 font-medium">
                    <MdEmail  className="h-4 w-4 mr-2 text-blue-500"/>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={authUser?.email}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    readOnly
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Account Information
                  </h2>
                  <button className="text-blue-600 hover:text-blue-800 transition-colors">
                    <FaPen/>
                  </button>
                </div>

                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Member Since</span>
                  <span className="text-gray-800">
                    {authUser.createdAt?.split("T")[0]}
                  </span>
                </div>

                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Account Status</span>
                  <span className="text-green-600 font-medium flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-8 pb-8 pt-2">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/update-profile"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg text-center transition-colors font-medium shadow-sm"
              >
                Update Profile
              </Link>
              <Link
                to="/change-password"
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg text-center transition-colors font-medium shadow-sm"
              >
                Change Password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;