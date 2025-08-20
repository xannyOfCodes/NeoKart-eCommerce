import { Moon, ToggleLeft, ToggleRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  // On mount, check localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Handle toggle
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  return (
        <button
      onClick={toggleDarkMode}
      className="flex items-center justify-between gap-2 p-2"
    >
     <span className="flex items-center gap-2 font-medium">
        <Moon/> Dark Mode
     </span>
     <span>
        { darkMode ? <ToggleRight className="w-7 h-7 dark:text-zinc-100"/>  : <ToggleLeft className="w-7 h-7"/> }
     </span>
    </button>
  );
}
