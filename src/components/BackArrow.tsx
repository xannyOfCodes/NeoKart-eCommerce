import React from "react";  
import { useNavigate } from "react-router-dom";  
import { ArrowLeft } from "lucide-react"; 


const BackArrow: React.FC = () => {
  const navigate = useNavigate(); // Gives access to navigation functions

  // This function will run when the arrow is clicked
  const handleGoBack = () => {
    navigate(-1); // "-1" tells React Router to go back one step in history
  };

  return (
    <button
      onClick={handleGoBack} // Runs the back function when clicked
      className=" text-gray-800 cursor-pointer hover:text-black transition-colors
      dark:text-zinc-100"
    >
      {/* Arrow Icon */}
      <ArrowLeft size={25} />
    </button>
  );
};

export default BackArrow;
