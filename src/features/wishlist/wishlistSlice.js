import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  wishlistItems: [],
  wishlistItemCount: 0
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const { game } = action.payload
      const existingItem = state.wishlistItems.find(item => item.id === game.id)

      if (existingItem) return

      state.wishlistItems.push(game)
      state.wishlistItemCount += 1
    },
    removeFromWishlist: (state, action) => {
      const { game } = action.payload
      const existingItem = state.wishlistItems.find(item => item.id === game.id)

      if (!existingItem) return

      state.wishlistItems = state.wishlistItems.filter(
        item => item.id !== game.id
      )
      state.wishlistItemCount -= 1
    },
    clearWishlist: state => {
      return initialState
    },
    loadWishlist: (state, action) => {
      state.wishlistItems = action.payload
      state.wishlistItemCount = action.payload.length
    }
  }
})

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  loadWishlist
} = wishlistSlice.actions

export function checkIsWishlisted (state, gameId) {
  return (
    state?.wishlist?.wishlistItems?.some(game => {
      return game.id === gameId
    }) || false
  )
}

export default wishlistSlice.reducer
