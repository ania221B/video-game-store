import { Link, useRouteLoaderData } from 'react-router-dom'
import { Carousel } from '../components/ui'
import { ArrowRight } from 'lucide-react'

function Landing () {
  const { genresData } = useRouteLoaderData('home')
  const rawGenres = genresData.results
  const genres = rawGenres.toSorted((a, b) => a.name.localeCompare(b.name))

  if (genres.length === 0) return null
  return (
    <section className='section'>
      <div className='container' data-container='full-bleed'>
        <header className='section__header'>
          <h2>Genres</h2>
          <Link>
            <span>all genres</span>
            <span>
              <ArrowRight></ArrowRight>
            </span>
          </Link>
        </header>
        <Carousel slideList={genres}></Carousel>
      </div>
    </section>
  )
}

export default Landing
