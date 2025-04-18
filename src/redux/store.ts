import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/theme/themeSlice";
import authReducer from "./features/auth/authSlice";
import cartReducer from "./features/cart/cartSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";

// Persist config for auth
const authPersistConfig = {
  key: "auth",
  storage,
};
// Persist config for theme
const themePersistConfig = {
  key: "theme",
  storage,
};
// Persist config for theme
const cartPersistConfig = {
  key: "carts",
  storage,
};

const persistedThemeReducer = persistReducer(themePersistConfig, themeReducer);
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    theme: persistedThemeReducer,
    auth: persistedAuthReducer,
    carts: persistedCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
