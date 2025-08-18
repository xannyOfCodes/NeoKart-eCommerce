import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search, X, SlidersHorizontal, Clock } from "lucide-react";
import BackArrow from "../BackArrow";

// ---- Types for the component props ----
interface SearchBarProps {
  // Called when a search is submitted (press Enter or click a history item).
  onSearch: (query: string) => void;

  // Optional: parent can listen when user is typing (so you can hide other UI).
  // We call it with `true` when input has text; `false` when cleared.
  onTypingChange?: (typing: boolean) => void;

  // Optional: controlled value (if parent wants to control input)
  value?: string;

  // Optional: initial value for the input (if you want a default search string)
  defaultValue?: string;

  // Optional: called when the Filter button is clicked
  onOpenFilter?: () => void;

  // Optional: autofocus the input on mount (good for dedicated search screen)
  autoFocus?: boolean;

  // Optional: placeholder for input
  placeholder?: string;

  // Optional: storage key if you want separate histories for different areas
  storageKey?: string; // default "searchHistory"
}

// ---- Constants for localStorage history ----
const DEFAULT_STORAGE_KEY = "searchHistory";
const MAX_HISTORY = 8; // Keep last 8 entries

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onTypingChange,
  value,
  defaultValue = "",
  onOpenFilter,
  placeholder = "Search products...",
  storageKey = DEFAULT_STORAGE_KEY,
}) => {
  // If `value` is provided, the input is "controlled" by parent.
  // If not, we manage our own internal state.
  const [internalQuery, setInternalQuery] = useState(defaultValue);

  // Derived "query" used by the component (supports both controlled/uncontrolled).
  const query = value !== undefined ? value : internalQuery;

  // Local state: show/hide the history dropdown
  const [showHistory, setShowHistory] = useState(false);

  // Local state: array of history terms
  const [history, setHistory] = useState<string[]>([]);

  // Refs for click-outside handling
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // ---- Load existing history from localStorage on mount ----
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      const parsed: string[] = raw ? JSON.parse(raw) : [];
      setHistory(Array.isArray(parsed) ? parsed : []);
    } catch {
      setHistory([]); // Fallback if JSON parse fails
    }
  }, [storageKey]);

  // ---- Helper: Save history to localStorage ----
  const saveHistory = (list: string[]) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(list));
    } catch {
      // Ignore quota errors silently
    }
  };

  // ---- Helper: Add a term to history (dedupe, MRU, max size) ----
  const addToHistory = (term: string) => {
    const cleaned = term.trim();
    if (!cleaned) return;
    setHistory((prev) => {
      // Remove existing occurrence (case-insensitive dedupe)
      const filtered = prev.filter((t) => t.toLowerCase() !== cleaned.toLowerCase());
      const next = [cleaned, ...filtered].slice(0, MAX_HISTORY);
      saveHistory(next);
      return next;
    });
  };

  // ---- Helper: Remove a single term from history ----
  const removeFromHistory = (term: string) => {
    setHistory((prev) => {
      const next = prev.filter((t) => t !== term);
      saveHistory(next);
      return next;
    });
  };

  // ---- Helper: Clear all history ----
  const clearHistory = () => {
    setHistory([]);
    saveHistory([]);
  };

  // ---- Filtered list shown while typing (contains the query substring) ----
  const filteredHistory = useMemo(() => {
    if (!query) return history;
    return history.filter((t) => t.toLowerCase().includes(query.toLowerCase()));
  }, [query, history]);

  // ---- Handle change in the input value ----
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;

    // If parent controls value, tell them; else update our own state
    if (value !== undefined) {
      // Controlled mode: parent should update `value` prop on their side
      onTypingChange?.(next.trim().length > 0);
      setShowHistory(next.trim().length > 0); // show suggestions only when typing
    } else {
      // Uncontrolled mode
      setInternalQuery(next);
      onTypingChange?.(next.trim().length > 0);
      setShowHistory(next.trim().length > 0);
    }
  };

  // ---- Submit search (Enter key or click suggestion) ----
  const submitSearch = (term?: string) => {
    const finalTerm = term !== undefined ? term : query.trim();
    if (!finalTerm) return;
    onSearch(finalTerm);     // Tell parent "perform the search"
    addToHistory(finalTerm); // Persist to history
    setShowHistory(false);   // Hide dropdown
    onTypingChange?.(false); // Parent can restore the normal UI
    // If uncontrolled, we keep the text that user searched for

    if (inputRef.current) {
    inputRef.current.blur();
  }
  };

  // ---- Clear input with the "X" button ----
  const clearInput = () => {
    if (value !== undefined) {
      // Controlled: parent should set value to "" externally.
      onTypingChange?.(false);
    } else {
      setInternalQuery("");
      onTypingChange?.(false);
    }
    setShowHistory(false);
    // Keep focus on input for convenience
    inputRef.current?.focus();
  };

  // ---- Handle form submit (press Enter) ----
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitSearch();
  };

  // ---- Click outside to close dropdown ----
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setShowHistory(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full sticky top-0 z-20 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60"
    >
      {/* Header Row: Back | Search Input | Filter */}
      <div className="flex items-center gap-3 p-3">
        {/* Back Button (your existing component) */}
        <BackArrow />

        {/* Search form (so Enter key works) */}
        <form onSubmit={handleSubmit} className="flex-1 relative">
          {/* Input wrapper for icons */}
          <div className="w-full relative">
            {/* Left search icon inside input */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Search className="w-5 h-5 text-gray-400" />
            </div>

            {/* The actual input */}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleChange}
              placeholder={placeholder}
              className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />

            {/* Clear (X) button appears when there is text */}
            {query && (
              <button
                type="button"
                onClick={clearInput}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                aria-label="Clear search"
                title="Clear search"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>

          {/* History dropdown (shown only while typing / when showHistory = true) */}
          {showHistory && filteredHistory.length > 0 && (
            <div className="absolute left-0 right-0 mt-2 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 text-xs text-gray-500">
                <span>Recent searches</span>
                <button
                  type="button"
                  onClick={clearHistory}
                  className="hover:underline"
                >
                  Clear all
                </button>
              </div>

              <ul className="max-h-64 overflow-auto">
                {filteredHistory.map((term) => (
                  <li
                    key={term}
                    className="flex items-center justify-between px-3 py-2 hover:bg-gray-50"
                  >
                    {/* Click the left side to search this term */}
                    <button
                      type="button"
                      onClick={() => submitSearch(term)}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{term}</span>
                    </button>

                    {/* Remove single item from history */}
                    <button
                      type="button"
                      onClick={() => removeFromHistory(term)}
                      className="p-1 rounded hover:bg-gray-100"
                      aria-label={`Remove ${term} from history`}
                      title={`Remove ${term} from history`}
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>

        {/* Filter button on the right */}
        <button
          type="button"
          onClick={onOpenFilter}
          className="p-2 rounded-full border border-gray-300 hover:bg-gray-50"
          aria-label="Open filters"
          title="Open filters"
        >
          <SlidersHorizontal className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
