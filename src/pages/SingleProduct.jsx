import { useLoaderData } from 'react-router-dom'
import { screenshotsQuery, singleGameQuery } from '../api'
import { getFormatedDate } from '../utils/getFormattedDate'
import {
  ProductCart,
  ProductDescription,
  ProductGallery,
  ProductRatings,
  ProductRequirements
} from '../components/ui'
import { useQuery } from '@tanstack/react-query'
import { Loader } from '../components/common'

export const loader = queryClient =>
  async function ({ params }) {
    const { id } = params

    await Promise.all([
      queryClient.ensureQueryData(singleGameQuery(id)),
      queryClient.ensureQueryData(screenshotsQuery(id))
    ])

    return id
  }

function SingleProduct () {
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
    platforms
  } = game

  return (
    <section>
      <article className='product container'>
        {/* PRODUCT HERO */}
        <div className='product__img'>
          <img src={background_image} alt={name} />
        </div>
        <div className='product__content'>
          <header>
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
          <ProductCart platforms={platforms}></ProductCart>
          {/* PRODUCT DESCRIPTION */}
          <ProductDescription description={description}></ProductDescription>
          {/* PRODUCT GALLERY */}
          <ProductGallery
            gameName={name}
            gameScreenshots={screenshots}
          ></ProductGallery>
          {/* PRODUCT REQUIREMENTS */}
          <ProductRequirements platformList={platforms}></ProductRequirements>
        </div>
      </article>
    </section>
  )
}

export default SingleProduct
