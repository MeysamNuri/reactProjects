import { configureStore } from "@reduxjs/toolkit";

import productsReducerrr, { fetchProducts } from "../slices/productSlice";
import cartReducer, { getTotal } from "../slices/cartSlice";
import { productApi } from "../slices/productApi";

export const store = configureStore({
    reducer: {
        products: productsReducerrr,
        cart: cartReducer,
        [productApi.reducerPath]: productApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productApi.middleware),
});

store.dispatch(fetchProducts());
store.dispatch(getTotal());
