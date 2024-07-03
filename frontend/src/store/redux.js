import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice';
import productSlice from './products/productSlice';
import userSlice from './users/userSlice';
import blogSlice from './blogs/blogsSlice';
import blogCategorySlice from './blogCategory.js/categorySlice';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist'
import orderSlice from './orders/ordersSlice';


const commonConfig = {
  storage
};

const userConfig = {
  ...commonConfig,
  key: 'shop/user',
  whitelist: ['isLoggedIn', 'token', 'current']
}

const productConfig = {
  ...commonConfig,
  key: 'shop/deal',
  whitelist: ['dealDaily']
}
export const store = configureStore({
  reducer: {
    app: appSlice,
    blogs: blogSlice,
    cateBlog: blogCategorySlice,
    products: persistReducer(productConfig, productSlice),
    user: persistReducer(userConfig, userSlice),
    orders: orderSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      },
    })

});

export const persistor = persistStore(store)
