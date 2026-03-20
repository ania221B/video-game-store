import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import HeroImage from './HeroImage'
import { placeholderImages } from '../../data'

function ProductCard ({ item }) {
  const { id, slug, name, background_image: img, rating } = item
  const price = (0).toFixed(2)
  return (
    <article className='product-item'>
      <div className='product-item__img'>
        {img ? (
          <img src={img} alt={name} width='300' height='250' />
        ) : (
          <HeroImage image={placeholderImages.placeholder}></HeroImage>
        )}
      </div>

      <div className='product-item__content'>
        <h3 className='product-item__name'>{name}</h3>

        <div className='product-item__info'>
          <dl>
            <dt className='sr-only'>Price:</dt>
            <dd className='product-item__price-current'>
              <span className='sr-only'>Current price is ${price}.</span>
              <span aria-hidden='true'>${price}</span>
            </dd>
          </dl>
          <dl className='product-item__rating'>
            <dt className='sr-only'>Rating:</dt>
            <dd>
              <span className='sr-only'>Rated {rating} out of 5 stars.</span>
              <span aria-hidden='true'>{rating} / 5</span>
              <span className='product-item__star'>
                <Star size={18}></Star>
              </span>
            </dd>
          </dl>
          {/* <h4 className='sr-only'>Genres:</h4>
          <ul className='product-item__genre-list'>
            {genres.slice(0, 2).map(genre => {
              return (
                <li key={genre.id}>
                  <Link>{genre.name}</Link>
                </li>
              )
            })}
            {genres.length > 2 && (
              <li>
                <Link to={`/products/${slug}`}>+{genres.length - 2} more</Link>
              </li>
            )}
          </ul> */}
        </div>
      </div>
      <Link
        to={`/products/${id}/${slug}`}
        className='btn'
        data-button='primary'
      >
        <span>See details</span>
        <span aria-hidden='true'>See details</span>
      </Link>
    </article>
  )
}

export default ProductCard
