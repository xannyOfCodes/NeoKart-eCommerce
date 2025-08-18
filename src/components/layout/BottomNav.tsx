import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Home, ShoppingCart, Heart, User, Search } from "lucide-react";

// Each nav item details
const navItems = [
  { name: "Home", icon: Home, path: "/" },
  { name: "Search", icon: Search, path: "/search" },
  { name: "Cart", icon: ShoppingCart, path: "/cart" },
  { name: "Wishlist", icon: Heart, path: "/wishlist" },
  { name: "Profile", icon: User, path: "/profile" },
];

const BottomNav: React.FC = () => {
  // Controls whether navbar is visible
  const [isVisible, setIsVisible] = useState(true);

  // This will store the scroll timeout reference
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Hide navbar immediately when scrolling starts
      setIsVisible(false);

      // Clear previous timeout if user is still scrolling
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Show navbar after 200ms of no scroll
      scrollTimeout.current = setTimeout(() => {
        setIsVisible(true);
      }, 200);
    };

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 w-full bg-gray-100  transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex justify-around items-center w-ful mx-auto shadow-lg border-t-1 border-t-gray-300 p-2">
        {navItems.map(({ name, icon: Icon, path }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-sm transition-colors p-3 rounded-full ${
                isActive ? "text-red-600 bg-red-200" : "text-zinc-800"
              }`
            }
          >
            <Icon size={24} />
            {/* <span className="text-sm">{name}</span> */}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
