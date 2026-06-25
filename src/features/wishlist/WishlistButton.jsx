import React from 'react'
import { Tooltip } from '../../components/ui'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToWishlist,
  checkIsWishlisted,
  removeFromWishlist
} from './wishlistSlice'
import { Heart, HeartOff } from 'lucide-react'
import { saveWishlist } from '../../api'
import { useQueryClient } from '@tanstack/react-query'

function WishlistButton ({ game, size = 48 }) {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const isWishlisted = useSelector(store => checkIsWishlisted(store, game.id))
  const { wishlistItems } = useSelector(store => store.wishlist)

  function toggleIsOnWishlist () {
    if (isWishlisted) {
      const updatedItems = wishlistItems.filter(item => item.id !== game.id)
      dispatch(removeFromWishlist({ game }))
      saveWishlist(updatedItems).then(() =>
        queryClient.invalidateQueries({ queryKey: ['wishlist'] })
      )
    } else {
      const updatedItems = [...wishlistItems, game]
      dispatch(addToWishlist({ game }))
      saveWishlist(updatedItems).then(() =>
        queryClient.invalidateQueries({ queryKey: ['wishlist'] })
      )
    }
  }
  return (
    <Tooltip text={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}>
      <button
        type='button'
        className='btn'
        onClick={toggleIsOnWishlist}
        data-button='icon'
      >
        <span className='sr-only'>
          {isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        </span>

        <Heart
          fill={isWishlisted ? 'currentColor' : 'none'}
          size={size}
        ></Heart>
      </button>
    </Tooltip>
  )
}

export default WishlistButton
