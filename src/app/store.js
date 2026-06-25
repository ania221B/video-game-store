import { configureStore } from '@reduxjs/toolkit'
import { authReducer, cartReducer, wishlistReducer } from '../features'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer
  }
})
