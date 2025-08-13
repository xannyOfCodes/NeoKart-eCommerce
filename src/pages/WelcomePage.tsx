import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react"; 
import { assets } from "../assets/assets";

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-red-500 w-full h-screen flex items-center justify-center">
      <div className="flex flex-col items-center text-zinc-100 space-y-5">
        {/* Logo */}
        <img
          src={assets.logoTransparent}
          alt="NeoKart Logo"
          className="w-4/5 max-w-sm"
        />

        {/* Tagline */}
        <p className="text-lg sm:text-xl font-light tracking-wide text-center">
          Shop the future. Today.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 mt-6 text-base border-2 border-zinc-200 px-6 py-2 rounded-full hover:bg-zinc-200 hover:text-red-600 transition-colors duration-200"
        >
          Enter NeoKart
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
