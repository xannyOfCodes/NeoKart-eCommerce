import { ChevronRight } from "lucide-react";
import React from "react";

interface ProfileHeaderProps {
  user: any;
}


const ProfileHeader: React.FC<ProfileHeaderProps> = ({user}) => {
     const firstLetter = user?.firstName?.[0]?.toUpperCase() || "U";
  return (
    <div className="w-[95%] mx-auto p-5 flex items-center justify-between border-1 border-gray-300 text-zinc-800 rounded-lg 
    dark:text-zinc-100">
      
      <div className="flex items-center gap-4">
        {/* Avatar with first letter */}
      <div className="w-15 h-15 flex items-center justify-center rounded-full border-2 border-gray-400  drop-shadow-sm text-2xl font-bold">
        {firstLetter}
      </div>

      {/* Name + email */}
      <div className="">
        <h2 className="font-semibold text-base">
          {user?.firstName} {user?.lastName}
        </h2>
        <p className="text-xs text-gray-500
        dark:text-gray-300">{user?.email}</p>
      </div>
      </div>

      <div className="">
        <ChevronRight/>
      </div>
    </div>
  )
}

export default ProfileHeader
