import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // Password visibility icons
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext"; 
import { BASE_URL } from "../../api/baseUrl";
import { toast, ToastContainer } from "react-toastify";

const Login: React.FC = () => {
  // State to store user input
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  
  // Loading state
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from AuthContext

  // Handle form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        username,
        password,
      });

      //Store user in AuthContext + localStorage
      login(res.data);

      // Navigate to main app
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center
    dark:bg-zinc-950">
      <div className="bg-white w-[90%] max-w-md rounded-lg p-8 shadow-lg
      dark:bg-zinc-800">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-6 text-zinc-700
        dark:text-zinc-100">
          Login to NeoKart
        </h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-gray-700 mb-1
            dark:text-zinc-100">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 placeholder:text-xs
              dark:placeholder:text-zinc-100 dark:text-zinc-100"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1
            dark:text-zinc-100">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 placeholder:text-xs
                dark:placeholder:text-zinc-100 dark:text-zinc-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300 disabled:bg-red-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-4
        dark:text-zinc-100">
          Not a user?{" "}
          <Link to="/signup" className="text-red-500 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Login;
