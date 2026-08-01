import { useDispatch, useSelector } from 'react-redux'
import { ProductList } from '../components/lists'
import { wishlistQuery } from '../api'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { loadWishlist } from '../features/wishlist/wishlistSlice'

function Wishlist () {
  const dispatch = useDispatch()
  const { data, isLoading, isError } = useQuery(wishlistQuery())
  const { wishlistItems, wishlistItemCount } = useSelector(
    state => state.wishlist
  )
  const isEmpty = wishlistItems.length === 0

  useEffect(() => {
    if (data) dispatch(loadWishlist(data))
  }, [data])

  return (
    <section className='section wishlist'>
      <div className='container'>
        <article>
          <header>
            <h1>Your Wishlist ({wishlistItemCount})</h1>
          </header>

          <div className='padding-block-start-48'>
            <ProductList
              products={wishlistItems}
              emptyMsg={{
                heading: 'Your wishlist is currently empty!',
                text: `You can add here any games you'd like to purchase one day`
              }}
            ></ProductList>
          </div>
        </article>
      </div>
    </section>
  )
}

export default Wishlist
