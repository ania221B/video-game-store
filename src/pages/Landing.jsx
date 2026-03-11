import { Link, useLoaderData, useRouteLoaderData } from 'react-router-dom'
import { Carousel } from '../components/ui'
import { ArrowRight } from 'lucide-react'
import { gamesApi } from '../api'

export async function loader () {
  try {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    const day = today.getDate()
    const timestampForOneDay = 86400000
    const lastWeek = new Date(today.getTime() - timestampForOneDay * 7)
    const sixMonthsAgo = new Date(year, month - 6, day)

    function formatDate (date) {
      return date.toISOString().split('T')[0]
    }
    const { data: newestGamesData } = await gamesApi.get('/games', {
      params: {
        dates: `${formatDate(lastWeek)},${formatDate(today)}`,
        ordering: '-released',
        page_size: 20
      }
    })

    const { data: trendingData } = await gamesApi.get('/games', {
      params: {
        dates: `${formatDate(sixMonthsAgo)},${formatDate(today)}`,
        ordering: '-added',
        page_size: 20
      }
    })

    const { data: criticallyAcclaimedData } = await gamesApi.get('/games', {
      params: {
        ordering: '-metacritic',
        metacritic: '80,100',
        page_size: 20
      }
    })

    return { newestGamesData, trendingData, criticallyAcclaimedData }
  } catch (error) {
    console.error('landing loader error', error)
    throw error
  }
}

function Landing () {
  const { genresData } = useRouteLoaderData('root')
  const { newestGamesData, trendingData, criticallyAcclaimedData } =
    useLoaderData()
  const rawGenres = genresData.results
  const genres = rawGenres.toSorted((a, b) => a.name.localeCompare(b.name))

  const featuredGames = trendingData.results.slice(0, 5)
  const newestGames = newestGamesData.results
  const trendingGames = trendingData.results
  const criticallyAcclaimedGames = criticallyAcclaimedData.results

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
