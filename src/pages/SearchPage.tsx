import React, { useEffect, useMemo, useState } from "react";
import SearchBar from "../components/Search/SearchBar";
import CategoryList from "../components/Category/CategoryList";
// Reuse your existing category data from Home:
import { categories as HomeCategories } from "../components/Category/categoryData"; 
import yellowStar from "/star-yellow.png"
import { Link } from "react-router-dom";
// ^ categoryData has: { name, slug, icon }. We'll map that to CategoryList's { id, name, image, slug }.

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  thumbnail: string;
  category: string;
};

type UiCategory = {
  id: number;
  name: string;
  icon: React.ElementType;
  slug: string;
};

// ---- Sort types for our local sort sheet ----
type SortBy = "relevance" | "price-asc" | "price-desc" | "title-asc" | "title-desc" | "rating-desc";

// ---- Helper: map your home categories to the props CategoryList expects ----
const CATEGORY_LIST: UiCategory[] = HomeCategories.map((c, idx) => ({
  id: idx + 1,
  name: c.name,
  icon: c.icon,
  slug: c.slug,
}));

const FIRST_CATEGORY_ID = CATEGORY_LIST[0]?.id ?? 1;     // default selected
const FIRST_CATEGORY_SLUG = CATEGORY_LIST[0]?.slug ?? ""; // used to fetch initial products

const SearchPage: React.FC = () => {
  // ----------- UI mode -----------
  // "category" = browsing a category, "search" = showing search results
  const [mode, setMode] = useState<"category" | "search">("category");

  // ----------- Search-related state -----------
  const [activeQuery, setActiveQuery] = useState<string>(""); // the query we last submitted (Enter)
  const [isTyping, setIsTyping] = useState<boolean>(false);   // SearchBar tells us when user is typing (to hide other UI)

  // ----------- Category-related state -----------
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(FIRST_CATEGORY_ID);
 const selectedCategory = useMemo<UiCategory | undefined>(
  () => CATEGORY_LIST.find(c => c.id === selectedCategoryId),
  [selectedCategoryId]
);

  // ----------- Data + network state -----------
  const [products, setProducts] = useState<Product[]>([]);  // what we render
  const [loading, setLoading] = useState<boolean>(false);   // spinner
  const [error, setError] = useState<string | null>(null);  // network errors

  // ----------- Sort sheet state -----------
  const [showSort, setShowSort] = useState<boolean>(false); // open/close the sort dropdown
  const [sortBy, setSortBy] = useState<SortBy>("relevance");// current sort mode

  // ============================================================
  // 1) INITIAL LOAD — fetch the first category by default
  // ============================================================
  useEffect(() => {
    // if we have a valid default category slug, load it once on mount
    if (FIRST_CATEGORY_SLUG) {
      fetchByCategory(FIRST_CATEGORY_SLUG);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ============================================================
  // 2) FETCH HELPERS
  // ============================================================

  // Fetch all products for a category
  const fetchByCategory = async (slug: string) => {
    setLoading(true);
    setError(null);
    setMode("category");   // we're in category mode now
    setActiveQuery("");    // clear any search query (we switched to category)
    try {
      const res = await fetch(`https://dummyjson.com/products/category/${encodeURIComponent(slug)}`);
      if (!res.ok) throw new Error("Failed to fetch category products");
      const data = await res.json();
      // data.products is an array; we store it locally (unsorted for now)
      setProducts(data.products || []);
    } catch (e) {
      setError((e as Error).message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products for a search query (triggered by Enter/submit from SearchBar)
  const fetchBySearch = async (query: string) => {
    setLoading(true);
    setError(null);
    setMode("search");   // we're in search mode now
    setActiveQuery(query);
    try {
      const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Failed to fetch search results");
      const data = await res.json();
      setProducts(data.products || []);
    } catch (e) {
      setError((e as Error).message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // 3) SORTING (client-side)
  // ============================================================
  // We sort whatever list we currently have (search results or category list).
  // This avoids API limitations (sort doesn't combine well with /search or /category).
  const sortedProducts = useMemo(() => {
    const list = [...products]; // copy so we don't mutate state
    switch (sortBy) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "title-asc":
        return list.sort((a, b) => a.title.localeCompare(b.title));
      case "title-desc":
        return list.sort((a, b) => b.title.localeCompare(a.title));
      case "rating-desc":
        return list.sort((a, b) => b.rating - a.rating);
      case "relevance":
      default:
        return list; // leave as-is (API order)
    }
  }, [products, sortBy]);

  // ============================================================
  // 4) EVENT HANDLERS
  // ============================================================

  // SearchBar told us: user pressed Enter with this query
  const handleSearchSubmit = (query: string) => {
    // If empty, ignore
    if (!query.trim()) return;
    // Perform a search
    fetchBySearch(query.trim());
  };

  // SearchBar told us: user started/stopped typing
  // When typing === true => hide category strip and product grid (SearchBar will show history)
  const handleTypingChange = (typing: boolean) => {
    setIsTyping(typing);
  };

  // User clicked the sort (sliders) button in SearchBar
  const handleOpenSort = () => {
    setShowSort((s) => !s); // toggle
  };

  // User clicked a category chip/card
  const handleCategorySelect = (cat: UiCategory) => {
  setSelectedCategoryId(cat.id);
  fetchByCategory(cat.slug);
};

  // ============================================================
  // 5) RENDER
  // ============================================================
  return (
    <div className="min-h-screen bg-gray-50">
      {/* SearchBar controls typing, search submit, and "sort sheet" open */}
      <SearchBar
        onSearch={handleSearchSubmit}       // Enter/submit triggers a search
        onTypingChange={handleTypingChange} // typing true => hide UI under bar
        onOpenFilter={handleOpenSort}       // use Sliders icon as "Sort" trigger
        placeholder="Search products..."
        autoFocus
      />

      {/* Sort dropdown (simple sheet under the bar) */}
      {showSort && !isTyping && (
        <div className="px-3">
          <div className="mt-2 rounded-xl border-1 border-gray-500 bg-white shadow p-2">
            <p className="text-xs text-gray-500 px-1 mb-1 font-semibold">Sort by</p>
            <div className="grid grid-cols-2 gap-2">
              {/* Each button updates sortBy and closes sheet */}
              <button
                onClick={() => { setSortBy("relevance"); setShowSort(false); }}
                className={`text-sm px-3 py-2 rounded border-1 border-gray-400 ${sortBy === "relevance" ? "bg-red-500 text-white" : "bg-white text-zinc-700"}`}
              >
                Relevance
              </button>
              <button
                onClick={() => { setSortBy("price-asc"); setShowSort(false); }}
                className={`text-sm px-3 py-2 rounded border-1 border-gray-400 ${sortBy === "price-asc" ? "bg-red-500 text-white" : "bg-white text-zinc-700"}`}
              >
                Price ↑
              </button>
              <button
                onClick={() => { setSortBy("price-desc"); setShowSort(false); }}
                className={`text-sm px-3 py-2 rounded border-1 border-gray-400 ${sortBy === "price-desc" ? "bg-red-500 text-white" : "bg-white text-zinc-700"}`}
              >
                Price ↓
              </button>
              <button
                onClick={() => { setSortBy("title-asc"); setShowSort(false); }}
                className={`text-sm px-3 py-2 rounded border-1 border-gray-400 ${sortBy === "title-asc" ? "bg-red-500 text-white" : "bg-white text-zinc-700"}`}
              >
                Title A–Z
              </button>
              <button
                onClick={() => { setSortBy("title-desc"); setShowSort(false); }}
                className={`text-sm px-3 py-2 rounded border-1 border-gray-400 ${sortBy === "title-desc" ? "bg-red-500 text-white" : "bg-white text-zinc-700"}`}
              >
                Title Z–A
              </button>
              <button
                onClick={() => { setSortBy("rating-desc"); setShowSort(false); }}
                className={`text-sm px-3 py-2 rounded border-1 border-gray-400 ${sortBy === "rating-desc" ? "bg-red-500 text-white" : "bg-white text-zinc-700"}`}
              >
                Rating
              </button>
            </div>
          </div>
        </div>
      )}

      {/* If the user is typing, we hide everything under the bar.
          Your SearchBar already shows the "Recent searches" dropdown. */}
      {isTyping ? null : (
        <>
          {/* CATEGORY STRIP — only show in category mode (hidden after a search) */}
          {mode === "category" && (
            <div className="px-3 pt-3">
              <CategoryList
                categories={CATEGORY_LIST}
                defaultSelectedId={FIRST_CATEGORY_ID}
                onCategorySelect={handleCategorySelect}
              />
            </div>
          )}

          {/* RESULTS AREA */}
          <div className="p-3">
            {/* Status helpers */}
            {loading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && sortedProducts.length === 0 && (
              <p className="text-gray-400">No products found</p>
            )}

            {/* Optional header showing what we're browsing */}
            {!loading && !error && sortedProducts.length > 0 && (
              <div className="mb-2 text-sm text-gray-500 font-semibold">
                {mode === "search" ? (
                  <span>Showing results for “{activeQuery}”</span>
                ) : (
                  <span>Category: {selectedCategory?.name}</span>
                )}
              </div>
            )}

            {/* Product grid */}
            <div className="grid grid-cols-2 gap-4">
              {sortedProducts.map((p) => (
                <div key={p.id} className="bg-white rounded-xl shadow-sm p-3 flex flex-col">
                  <Link to={`/product/${p.id}`}>
                      <img
                    src={p.thumbnail}
                    alt={p.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  </Link>
                  <h3 className="text-sm font-medium mt-2 line-clamp-2">{p.title}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-red-500 font-semibold">${p.price}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-x-0.5"><img src={yellowStar} alt=""  className="w-3.5 inline"/> <span>{p.rating}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;
