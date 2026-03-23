import { Link } from 'react-router-dom'
import { Carousel } from '../components/ui'
import { ArrowRight } from 'lucide-react'
import {
  criticallyAcclaimedGamesQuery,
  genresQuery,
  newestGamesQuery,
  trendingGamesQuery
} from '../api'
import { useQuery } from '@tanstack/react-query'
import { Loader } from '../components/common'

export const loader = queryClient => async () => {
  await Promise.all([
    queryClient.ensureQueryData(newestGamesQuery()),
    queryClient.ensureQueryData(trendingGamesQuery()),
    queryClient.ensureQueryData(criticallyAcclaimedGamesQuery())
  ])
  return null
}

function Landing () {
  const genreQuery = useQuery(genresQuery())
  const newestQuery = useQuery(newestGamesQuery())
  const trendingQuery = useQuery(trendingGamesQuery())
  const criticallyAcclaimedQuery = useQuery(criticallyAcclaimedGamesQuery())

  const isLoading =
    genreQuery.isLoading ||
    newestQuery.isLoading ||
    trendingQuery.isLoading ||
    criticallyAcclaimedQuery.isLoading
  const isError =
    genreQuery.isError ||
    newestQuery.isError ||
    trendingQuery.isError ||
    criticallyAcclaimedQuery.isError

  if (isLoading) return <Loader></Loader>
  if (isError) return <p>Error!</p>

  const rawGenres = genreQuery.data?.results || []
  const genres = rawGenres.toSorted((a, b) => a.name.localeCompare(b.name))

  const featuredGames = trendingQuery.data?.results.slice(0, 5) || []
  const newestGames = newestQuery.data?.results || []
  const trendingGames = trendingQuery.data?.results || []
  const criticallyAcclaimedGames = criticallyAcclaimedQuery.data?.results || []

  const featuredId = 'featured'
  const genresId = 'genres'
  const newestId = 'newest'
  const trendingId = 'trending'
  const criticallyAcclaimedId = 'critically-acclaimed'

  return (
    <>
      {featuredGames.length > 0 ? (
        <section>
          <div className='container' data-container='full-bleed'>
            <header className='section__header'>
              <h2 className='sr-only' id={featuredId}>
                Featured
              </h2>
            </header>
            <Carousel
              slideList={featuredGames}
              type='hero'
              label={featuredId}
            ></Carousel>
          </div>
        </section>
      ) : null}

      {genres.length > 0 ? (
        <section className='section'>
          <div className='container' data-container='large'>
            <header className='section__header'>
              <h2 id={genresId}>Genres</h2>
              <Link to='/genres' className='btn' data-button='outline'>
                <span>all genres</span>
                <span>
                  <ArrowRight></ArrowRight>
                </span>
              </Link>
            </header>
          </div>
          <div className='container' data-container='full-bleed'>
            <Carousel
              slideList={genres}
              type='genres'
              route='genres'
              label={genresId}
            ></Carousel>
          </div>
        </section>
      ) : null}

      {newestGames.length > 0 ? (
        <section>
          <div className='container' data-container='large'>
            <header className='section__header'>
              <h2 id={newestId}>Newest</h2>
              <Link to='/products' className='btn' data-button='outline'>
                <span>all games</span>
                <span>
                  <ArrowRight></ArrowRight>
                </span>
              </Link>
            </header>
          </div>
          <div className='container' data-container='full-bleed'>
            <Carousel slideList={newestGames} label={newestId}></Carousel>
          </div>
        </section>
      ) : null}

      {trendingGames.length > 0 ? (
        <section className='section'>
          <div className='container' data-container='large'>
            <header className='section__header'>
              <h2 id={trendingId}>Trending Right Now</h2>
              <Link to='/products' className='btn' data-button='outline'>
                <span>all games</span>
                <span>
                  <ArrowRight></ArrowRight>
                </span>
              </Link>
            </header>
          </div>
          <div className='container' data-container='full-bleed'>
            <Carousel slideList={trendingGames} label={trendingId}></Carousel>
          </div>
        </section>
      ) : null}

      {criticallyAcclaimedGames.length > 0 ? (
        <section>
          <div className='container' data-container='large'>
            <header className='section__header'>
              <h2 id={criticallyAcclaimedId}>Critically Acclaimed</h2>
              <Link to='/products' className='btn' data-button='outline'>
                <span>all games</span>
                <span>
                  <ArrowRight></ArrowRight>
                </span>
              </Link>
            </header>
          </div>
          <div className='container' data-container='full-bleed'>
            <Carousel
              slideList={criticallyAcclaimedGames}
              label={criticallyAcclaimedId}
            ></Carousel>
          </div>
        </section>
      ) : null}
    </>
  )
}

export default Landing
