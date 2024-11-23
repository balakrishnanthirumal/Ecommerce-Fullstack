import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice.js";
import authReducer from "./features/auth/authSlice.js";
import favouriteReducer from "../redux/features/favourite/favouriteSlice.js";
import { getFavoritesFromLocalStorage } from "../utils/localStorage.js";
import cartSliceReducer from "../redux/features/cart/cartSlice.js";
import shopSliceReducer from "../redux/features/shop/shopSlice.js";

const initialFavourite = getFavoritesFromLocalStorage() || [];
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favourites: favouriteReducer,
    cart: cartSliceReducer,
    shop: shopSliceReducer,
  },

  preloadedState: {
    favourites: initialFavourite,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
export default store;
