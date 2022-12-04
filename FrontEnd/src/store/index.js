import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/auth.reducer";
import productsSlice from "./product/products.reducer";
import formProductsSlice from "./product/form.reducer";
import categoriesSlice from "./category/categories.reducer";
import brandSlice from "./brand/brands.reducer";
import shoppingCartSlice from "./shoppingCart/shoppingCart.reducer";
import addressSlice from "./address/address.reducer";
import rsSlice from "./rs/rs.reducer";
import customerSlice from "./customer/customer.reduce";
import evaluateSlice from "./evaluate/evaluates.reducer";

const store = configureStore({
  reducer: {
    authSlice,
    productsSlice,
    formProductsSlice,
    categoriesSlice,
    brandSlice,
    shoppingCartSlice,
    addressSlice,
    rsSlice,
    customerSlice,
    evaluateSlice,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
