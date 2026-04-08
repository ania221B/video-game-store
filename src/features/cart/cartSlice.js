import { createSlice } from '@reduxjs/toolkit'

const defaultState = {
  cartItems: [],
  cartItemsCount: 0,
  cartTotal: 0
}

function getCartItemsFromLocalStorage () {
  return JSON.parse(localStorage.getItem('cart')) || defaultState
}

function updateLocalStorage (state) {
  localStorage.setItem('cart', JSON.stringify(state))
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartItemsFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload
      const existingProduct = state.cartItems.find(
        item => item.cartId === product.cartId
      )

      if (existingProduct) {
        state.cartItemsCount += product.quantity - existingProduct.quantity
        state.cartTotal +=
          product.price * (product.quantity - existingProduct.quantity)
        existingProduct.quantity = product.quantity
      } else {
        state.cartItems.push(product)
        state.cartItemsCount += product.quantity
        state.cartTotal += product.price * product.quantity
      }
      updateLocalStorage(state)
    },
    removeItem: (state, action) => {
      const { cartId } = action.payload
      const product = state.cartItems.find(item => item.cartId === cartId)

      state.cartItems = state.cartItems.filter(item => item.cartId !== cartId)
      state.cartItemsCount -= product.quantity
      state.cartTotal -= product.price * product.quantity

      updateLocalStorage(state)
    },

    updateItemQuantity: (state, action) => {
      const { cartId, quantity } = action.payload
      const product = state.cartItems.find(item => item.cartId === cartId)

      if (quantity === 0) {
        if (!product) return
        state.cartItems = state.cartItems.filter(item => item.cartId !== cartId)
        state.cartItemsCount -= product.quantity
        state.cartTotal -= product.price * product.quantity

        return
      }

      state.cartItemsCount += quantity - product.quantity
      state.cartTotal += product.price * (quantity - product.quantity)
      product.quantity = quantity

      updateLocalStorage(state)
    },
    clearCart: state => {
      updateLocalStorage(defaultState)
      return defaultState
    }
  }
})

export const { addItem, removeItem, updateItemQuantity, clearCart } =
  cartSlice.actions
export default cartSlice.reducer
