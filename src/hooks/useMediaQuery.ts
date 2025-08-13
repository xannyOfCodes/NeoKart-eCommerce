import { useState, useEffect } from "react";

// Custom hook to check if the screen width matches a given media query

export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

    useEffect(() => {
    const media = window.matchMedia(query);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Support both modern and old browsers
    if (media.addEventListener) {
      media.addEventListener("change", listener);
    } else {
      media.addListener(listener); // Safari fallback
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", listener);
      } else {
        media.removeListener(listener);
      }
    };
  }, [query]);

  return matches;
}


