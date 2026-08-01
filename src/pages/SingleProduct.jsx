import { useLoaderData } from 'react-router-dom'
import { screenshotsQuery, singleGameQuery } from '../api'
import getFormatedDate from '../utils/getFormattedDate'
import {
  HeroImage,
  ProductCart,
  ProductDescription,
  ProductGallery,
  ProductRatings,
  ProductRequirements
} from '../components/ui'
import { useQuery } from '@tanstack/react-query'
import { Loader } from '../components/common'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, WishlistButton } from '../features'
import { checkAmount } from '../utils'
import { placeholderImages } from '../data'
import LightboxCarousel from '../components/ui/LightboxCarousel'

function SingleProduct ({ min = 0, max = 100 }) {
  const dispatch = useDispatch()
  const { cartItems } = useSelector(store => store.cart)
  const { user } = useSelector(store => store.auth)

  const [selectedPlatform, setSelectedPlatform] = useState({
    name: '',
    slug: ''
  })
  const [quantity, setQuantity] = useState(1)
  const id = useLoaderData()
  const gameQuery = useQuery(singleGameQuery(id))
  const gameScreenshotsQuery = useQuery(screenshotsQuery(id))
  const isLoading = gameQuery.isLoading || gameScreenshotsQuery.isLoading

  if (isLoading) return <Loader></Loader>

  const game = gameQuery.data || {}
  const screenshots = gameScreenshotsQuery.data?.results || []
  const {
    name,
    released,
    description,
    background_image,
    metacritic,
    rating,
    platforms,
    price
  } = game
  const productPlatforms = platforms.toSorted((a, b) =>
    a.platform.name.localeCompare(b.platform.name)
  )
  const itemInCart = cartItems.find(
    item => item.cartId === game.id + selectedPlatform.slug
  )

  useEffect(() => {
    if (!selectedPlatform.slug && productPlatforms.length > 0) {
      const firstPlatform = productPlatforms[0]?.platform

      const name = firstPlatform?.name
      const slug = firstPlatform?.slug

      setSelectedPlatform({ name, slug })
    }
  }, [productPlatforms.slug, selectedPlatform])

  useEffect(() => {
    if (itemInCart) {
      setQuantity(itemInCart.quantity)
    }
  }, [itemInCart])

  const cartProduct = {
    cartId: game.id + selectedPlatform.slug,
    productId: game.id,
    slug: game.slug,
    image: background_image,
    name,
    price: game.price,
    platform: selectedPlatform,
    quantity
  }

  function addToCart () {
    dispatch(addItem({ product: cartProduct }))
  }

  return (
    <section>
      <article className='product container'>
        {/* PRODUCT HERO */}
        <div className='product__img'>
          {background_image ? (
            <img
              src={background_image}
              alt={name}
              width='300'
              height='250'
              loading='lazy'
            />
          ) : (
            <HeroImage image={placeholderImages.placeholder}></HeroImage>
          )}
        </div>
        <div className='product__content'>
          <header>
            {/* {user && <WishlistButton game={game}></WishlistButton>} */}
            <WishlistButton game={game}></WishlistButton>
            <div className='flow'>
              <h1 className='product__name fs-900'>{name}</h1>
              <p className='uppercase letter-spacing-1'>
                release date: {getFormatedDate(released, true)}
              </p>
            </div>

            <ProductRatings
              rating={rating}
              metacritic={metacritic}
            ></ProductRatings>
          </header>
          {/* PRODUCT CART */}
          <ProductCart
            platforms={productPlatforms}
            price={price}
            selectedPlatform={selectedPlatform}
            setSelectedPlatform={setSelectedPlatform}
            quantity={quantity}
            onIncrease={() =>
              setQuantity(currentQty => checkAmount(currentQty + 1, min, max))
            }
            onDecrease={() =>
              setQuantity(currentQty => checkAmount(currentQty - 1, min, max))
            }
            onChange={currentQty =>
              setQuantity(checkAmount(currentQty, min, max))
            }
            addToCart={addToCart}
          ></ProductCart>
          {/* PRODUCT DESCRIPTION */}
          <ProductDescription description={description}></ProductDescription>
          {/* PRODUCT GALLERY */}
          <ProductGallery
            gameName={name}
            gameScreenshots={screenshots}
          ></ProductGallery>
          {/* PRODUCT REQUIREMENTS */}
          <ProductRequirements
            platformList={productPlatforms}
          ></ProductRequirements>
        </div>
      </article>
    </section>
  )
}

export default SingleProduct
