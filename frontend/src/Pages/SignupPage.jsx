import Pattern from "../components/Pattern";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill, RiLoader5Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if(!formData.name.trim()) return toast.error("Name is required")
    if(!formData.email.trim()) return toast.error("Email is required")
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const success = validateForm();
    if(success == true) signup(formData);
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto">
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8 py-12 space-y-8"
      >
        <div className="w-full max-w-md mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-600">Join our community today</p>
        </div>

        <div className="w-full max-w-md">
          <label className="block text-gray-700 text-sm font-medium mb-2 transition-colors group">
            <span className="flex items-center gap-2 group-hover:text-blue-600">
              <FaUser className="h-5 w-5 text-blue-500" />
              Name
            </span>
          </label>
          <input
            type="text" 
            placeholder="John Doe"
            className="w-full p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div className="w-full max-w-md">
          <label className="block text-gray-700 text-sm font-medium mb-2 transition-colors group">
            <span className="flex items-center gap-2 group-hover:text-blue-600">
              <MdEmail className="h-5 w-5 text-blue-500" />
              Email
            </span>
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div className="w-full max-w-md">
          <label className="block text-gray-700 text-sm font-medium mb-2 transition-colors group">
            <span className="flex items-center gap-2 group-hover:text-blue-600">
              <RiLockPasswordFill className="h-5 w-5 text-blue-500" />
              Password
            </span>
          </label>
          <input
            type="password"
            placeholder="ㆍㆍㆍㆍㆍㆍㆍㆍㆍ"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
          <p className="text-xs text-gray-500 mt-2">Password must be at least 6 characters</p>
        </div>

        <button 
          type="submit" 
          className="w-full max-w-md p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md font-medium flex justify-center items-center" 
          disabled={isSigningUp}
        >
          {isSigningUp ? (
            <>
              < RiLoader5Line className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />  
              <span>Creating account...</span>
            </>
          ) : (
            "Create Account"
          )}
        </button>
        
        <span className="text-gray-700 text-center">
          Already have an account?
          <Link
            to="/login"
            className="ml-1.5 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            Sign in
          </Link>
        </span>
      </form>
      
      <div className="hidden lg:flex flex-col justify-center items-center w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-xl">
        <Pattern
          title={"Join our community"}
          subtitle={
            "Connect with friends, share moments, and stay in touch with your loved ones."
          }
        />
      </div>
    </div>
  );
};

export default SignupPage;