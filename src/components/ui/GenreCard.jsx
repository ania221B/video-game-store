import { Link } from 'react-router-dom'
import { useState } from 'react'
import HeroImage from './HeroImage'
import { placeholderImages } from '../../data'
import { singleGenreQuery } from '../../api'
import { useQuery } from '@tanstack/react-query'
import { normalizeText } from '../../utils'

function GenreCard ({ genre }) {
  const [showDescription, setShowDescription] = useState(false)

  function toggleDescription () {
    setShowDescription(!showDescription)
  }

  const { data, isLoading } = useQuery({
    ...singleGenreQuery(genre.id),
    enabled: showDescription
  })

  return (
    <article
      className='genre-card'
      data-state={showDescription ? 'opened' : 'closed'}
    >
      <div className='genre-card__img'>
        {genre?.image_background ? (
          <img src={genre.image_background} alt={genre.name} />
        ) : (
          <HeroImage image={placeholderImages.placeholder}></HeroImage>
        )}
      </div>

      <h2 className='genre-card__title fs-700'>{genre.name}</h2>
      <div className='genre-card__content'>
        {isLoading && <h3>Loading. Please wait...</h3>}
        {data && <p>{normalizeText(data.description)}</p>}
      </div>

      <div className='genre-card__buttons'>
        <button
          type='button'
          className='btn'
          data-button='primary'
          onClick={toggleDescription}
        >
          <span>See Info</span>
          <span aria-hidden='true'>See Info</span>
        </button>
        <Link
          to={`/genres/${genre.id}/${genre.slug}`}
          className='btn'
          data-button='secondary'
        >
          See games
        </Link>
      </div>
    </article>
  )
}

export default GenreCard
