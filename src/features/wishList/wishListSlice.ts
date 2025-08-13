import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

// ---- TYPES ----
interface WishlistItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface WishlistState {
  items: WishlistItem[];
}

// ---- HELPERS ----
// Load wishlist from localStorage (runs on startup)
const loadWishlistFromLocalStorage = (): WishlistItem[] => {
  try {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Save wishlist to localStorage
const saveWishlistToLocalStorage = (items: WishlistItem[]) => {
  try {
    localStorage.setItem("wishlist", JSON.stringify(items));
  } catch {
    // Fail silently if storage quota exceeded
  }
};

// ---- INITIAL STATE ----
const initialState: WishlistState = {
  items: loadWishlistFromLocalStorage(), // Load from storage
};

// ---- SLICE ----
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // ADD TO WISHLIST
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        saveWishlistToLocalStorage(state.items); // Save after adding
      }
    },

    // REMOVE FROM WISHLIST
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveWishlistToLocalStorage(state.items); // Save after removing
    },

    // TOGGLE WISHLIST
    toggleWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (exists) {
        // remove
        state.items = state.items.filter((item) => item.id !== action.payload.id);
      } else {
        // add
        state.items.push(action.payload);
      }
      saveWishlistToLocalStorage(state.items); // Save after update
    },

    // CLEAR WISHLIST
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToLocalStorage(state.items); // Save after clearing
    },
  },
});

// ---- EXPORTS ----
export const { addToWishlist, removeFromWishlist,  toggleWishlist, clearWishlist } = wishlistSlice.actions;
export const selectWishlist = (state: RootState) => state.wishlist.items;
export default wishlistSlice.reducer;
