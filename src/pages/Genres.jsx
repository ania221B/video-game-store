import { useQuery } from '@tanstack/react-query'
import { Loader } from '../components/common'
import { genresQuery } from '../api'
import { GenreCard } from '../components/ui'

function Genres () {
  const { data: genresData, isLoading } = useQuery(genresQuery())

  if (isLoading) return <Loader></Loader>

  const genres = genresData?.results || []
  const firstGenre = genres[0]

  if (!genres.length) {
    return (
      <div>
        <h1>Sorry... Nothing to display here.</h1>
        <p>Genres data couldn't be loaded. Please try refreshing the page.</p>
      </div>
    )
  }
  return (
    <section>
      <div className='container' data-container='large'>
        <header className='page-header stack-grid'>
          <div className='main-content'>
            <h1>Game genres</h1>
          </div>
          <picture className='bg-img' style={{ blockSize: '45dvh' }}>
            <img src={firstGenre.image_background} alt='' />
          </picture>
        </header>
        <ul className='grid-auto-fit' style={{ '--card-base-width': '27rem' }}>
          {genres.map(genre => {
            return (
              <li key={genre.id}>
                <GenreCard genre={genre}></GenreCard>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default Genres
