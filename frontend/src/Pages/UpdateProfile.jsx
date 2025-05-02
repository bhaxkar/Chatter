import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useProfileStore } from "../store/useProfileStore";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import toast from "react-hot-toast";

const UpdateProfilePage = () => {
  const { authUser } = useAuthStore();
  const { updateProfile, isUpdatingProfileDetails } = useProfileStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: authUser?.name || "",
    email: authUser?.email || "",
  });

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.name) return toast.error("Name is required");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      try {
        await updateProfile(formData);
        navigate("/profile");
      } catch (error) {
        return toast.error("Failed to update profile:");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 py-16">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
            <h1 className="text-2xl font-bold mb-1">Update Profile</h1>
            <p className="text-blue-100 text-sm">
              Edit your account information
            </p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="flex items-center text-gray-600 text-sm mb-1 font-medium">
                    <FaUser  className="h-4 w-4 mr-2 text-blue-500"/>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center text-gray-600 text-sm mb-1 font-medium">
                    <MdEmail className="h-4 w-4 mr-2 text-blue-500"/>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="pt-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={isUpdatingProfileDetails}
                    className={`
                      flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 
                      rounded-lg text-center transition-colors font-medium shadow-sm
                      ${
                        isUpdatingProfileDetails
                          ? "opacity-70 cursor-not-allowed"
                          : ""
                      }
                    `}
                  >
                    {isUpdatingProfileDetails ? "Updating..." : "Save Changes"}
                  </button>
                  <Link
                    to="/profile"
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg text-center transition-colors font-medium shadow-sm"
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilePage;
