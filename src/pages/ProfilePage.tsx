import { Bell, ChevronRight, HelpCircle, Info, Lock, MapPin, ShieldCheck, User } from "lucide-react";
import BackArrow from "../components/BackArrow";
import DarkModeToggle from "../components/DarkModeToggle";
import LogoutButton from "../components/LogoutButton";
import ProfileHeader from "../components/ProfileHeader";
import { useAuth } from "../contexts/AuthContext";


const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen ">
      <div className="flex gap-x-20 p-4 text-xl font-semibold text-zinc-800
      dark:text-zinc-100">
        <BackArrow/> <h2>Settings</h2>
      </div>

      <div className=" flex flex-col bg-background mt-10">
      {/* Profile Header */}
      <ProfileHeader user={user} />

      {/* Options List */}
      <h2 className="mt-10 p-4 text-base font-semibold text-zinc-800
      dark:text-zinc-100">Other Settings</h2>
      <div className="w-[95%] mx-auto flex flex-col gap-4 p-3 border-gray-300 border-1 rounded-lg text-zinc-800
      dark:text-zinc-100">
        <button className="w-full p-3 font-medium border-b-1 border-gray-300 flex items-center justify-between">
          <span className=" flex items-center gap-2">
          <User className="relative bottom-[1px]"/> Edit Profile
          </span>
          <span>
            <ChevronRight/>
          </span>
        </button>
        <button className="w-full p-3 font-medium border-b-1 border-gray-300 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Lock className="relative bottom-[1px]"/> Change Password
          </span>
          <span>
            <ChevronRight/>
          </span>
        </button>
       <button className="w-full p-3 font-medium border-b-1 border-gray-300 flex items-center justify-between">
         <span className="flex items-center gap-2">
          <MapPin className="relative bottom-[1px]"/> Manage Address
        </span>
         <span>
            <ChevronRight/>
          </span>
       </button>
       <button className="w-full p-3 font-medium border-b-1 border-gray-300 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <Bell className="relative bottom-[1px]"/> Orders
        </span>
         <span>
            <ChevronRight/>
          </span>
       </button>
        

        {/* Dark Mode Toggle */}
        <DarkModeToggle />
      </div>

      {/* Other profile settings */}
      <div className="w-[95%] mx-auto mt-15 flex flex-col gap-4 p-3 border-gray-300 border-1 rounded-lg text-zinc-800
      dark:text-zinc-100">
        <button className="w-full p-3 font-medium border-b-1 border-gray-300 flex items-center justify-between">
          <span className=" flex items-center gap-2">
          <Info className="relative bottom-[1px]"/> About Application
          </span>
          <span>
            <ChevronRight/>
          </span>
        </button>
        <button className="w-full p-3 font-medium border-b-1 border-gray-300 flex items-center justify-between">
          <span className=" flex items-center gap-2">
          <ShieldCheck className="relative bottom-[1px]"/>Privacy & Policy
          </span>
          <span>
            <ChevronRight/>
          </span>
        </button>
        <button className="w-full p-3 font-medium flex items-center justify-between">
          <span className=" flex items-center gap-2">
          <HelpCircle className="relative bottom-[1px]"/> Help/FAQ
          </span>
          <span>
            <ChevronRight/>
          </span>
        </button>
      </div>

      {/* Logout at bottom */}
      <div className="p-4 mt-10">
        <LogoutButton />
      </div>
    </div>
    </div>
  );
};

export default ProfilePage;
