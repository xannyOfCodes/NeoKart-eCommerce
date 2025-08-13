import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../../store/store";
import { BASE_URL } from "../../api/baseUrl";

// ---- TYPES ----

// The shape of a single cart item
interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

// The shape of the whole cart state
interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

// ---- HELPERS FOR LOCALSTORAGE ----

// Get cart from localStorage (runs only on page load)
const loadCartFromLocalStorage = (): CartItem[] => {
  try {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  } catch {
    return [];
  }
};

// Save cart to localStorage
const saveCartToLocalStorage = (cart: CartItem[]) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch {
    // Fail silently (e.g., if storage quota exceeded)
  }
};

// ---- INITIAL STATE ----

const initialState: CartState = {
  items: loadCartFromLocalStorage(), // Load from localStorage on startup
  loading: false,
  error: null,
};

// ---- ASYNC THUNKS ----

// Fetch cart from API for a specific user
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId: number) => {
    const res = await axios.get(`${BASE_URL}/carts/user/${userId}`);
    return res.data.carts[0]?.products || [];
  }
);

// Add/update an item in the cart (API)
export const addToCartAPI = createAsyncThunk(
  "cart/addToCartAPI",
  async (
    { userId, productId, quantity }: { userId: number; productId: number; quantity: number }
  ) => {
    const res = await axios.post(`${BASE_URL}/carts/add`, {
      userId,
      products: [{ id: productId, quantity }],
    });
    return res.data.products;
  }
);

// Delete an item from cart (API)
export const deleteFromCartAPI = createAsyncThunk(
  "cart/deleteFromCartAPI",
  async ({ cartId, productId }: { cartId: number; productId: number }) => {
    const res = await fetch(`${BASE_URL}/carts/${cartId}`, {
      method: "DELETE",
    });
    await res.json(); // DummyJSON doesn't actually delete a single product — just returns success
    return productId; // We'll use this to remove the item locally
  }
);


// ---- SLICE ----
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Clear the cart completely
    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state.items); // Persist empty cart
    },

    // Add or update an item locally (without API)
    addItemLocal: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        // If the item already exists, update its quantity
        existingItem.quantity += action.payload.quantity;
      } else {
        // If it's a new item, add it to the cart
        state.items.push(action.payload);
      }
      saveCartToLocalStorage(state.items);
    },

    // Remove a specific item
    removeItemLocal: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToLocalStorage(state.items);
    },
  },

  extraReducers: (builder) => {
    builder
      // When fetching cart from API
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        // Merge API cart with local cart
        const mergedCart = [...state.items];
        action.payload.forEach((apiItem) => {
          const existing = mergedCart.find((item) => item.id === apiItem.id);
          if (existing) {
            existing.quantity = apiItem.quantity; // update quantity from API
          } else {
            mergedCart.push(apiItem); // add new item from API
          }
        });
        state.items = mergedCart;
        saveCartToLocalStorage(state.items);
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch cart";
      })

      // When adding to cart via API
      .addCase(addToCartAPI.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        // Merge API response with local cart
        const mergedCart = [...state.items];
        action.payload.forEach((apiItem) => {
          const existing = mergedCart.find((item) => item.id === apiItem.id);
          if (existing) {
            existing.quantity = apiItem.quantity;
          } else {
            mergedCart.push(apiItem);
          }
        });
        state.items = mergedCart;
        saveCartToLocalStorage(state.items);
      })

      .addCase(deleteFromCartAPI.fulfilled, (state, action: PayloadAction<number>) => {
  state.items = state.items.filter((item) => item.id !== action.payload);
  saveCartToLocalStorage(state.items);
});

  },
});

// ---- EXPORTS ----
export const { clearCart, addItemLocal, removeItemLocal } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart.items;
export default cartSlice.reducer;
