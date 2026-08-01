import { Link } from 'react-router-dom'
import getFormatedDate from '../../utils/getFormattedDate'
import HeroImage from './HeroImage'
import { placeholderImages } from '../../data'

function Card ({ item, route = 'products', type = 'games', tabIndex = -1 }) {
  if (type === 'genres') {
    return (
      <Link
        to={`/${route}/${item.id}/${item.slug}`}
        className='card'
        tabIndex={tabIndex}
      >
        <article className='card__content'>
          <div className='card__img'>
            {item?.image_background ? (
              <img
                src={item.image_background}
                alt={item.name}
                width='300'
                height='250'
                loading='lazy'
              />
            ) : (
              <HeroImage image={placeholderImages.placeholder}></HeroImage>
            )}
          </div>
          <header className='card__header'>
            <h2 id={`game-label-${item.renderId}`}>{item.name}</h2>
            <p>games: {item.games_count}</p>
          </header>
        </article>
      </Link>
    )
  }
  return (
    <Link
      to={`/${route}/${item.id}/${item.slug}`}
      className='card'
      tabIndex={tabIndex}
    >
      <article className='card__content'>
        <div className='card__img'>
          {item?.background_image ? (
            <img
              src={item.background_image}
              alt={item.name}
              width='300'
              height='250'
              loading='lazy'
            />
          ) : (
            <HeroImage image={placeholderImages.placeholder}></HeroImage>
          )}
        </div>
        <header className='card__header'>
          <h2>{item.name}</h2>
          {type === 'games' && (
            <p>released: {getFormatedDate(item.released)}</p>
          )}
        </header>
      </article>
    </Link>
  )
}

export default Card
