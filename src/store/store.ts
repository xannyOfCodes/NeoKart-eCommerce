import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import wishlistReducer from "../features/wishList/wishListSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

// Types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
