import { ShoppingCart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

function ProductCard ({ item }) {
  const { name, background_image: img, rating, rating_top: ratingMax } = item
  const price = (0).toFixed(2)
  return (
    <article className='product-item'>
      <Link>
        <div className='product-item__img'>
          <img src={img} alt={name} width='400' height='250' />
        </div>
        <header>
          <h3>{name}</h3>
          <dl className='product-item__rating'>
            <dt className='sr-only'>Rating:</dt>
            <dd>
              <span className='sr-only'>
                Rated {rating} out of {ratingMax} stars.
              </span>
              <span aria-hidden='true'>
                {rating} / {ratingMax}
              </span>
              <span className='product-item__star'>
                <Star size={18}></Star>
              </span>
            </dd>
          </dl>
        </header>
        <dl>
          <dt className='sr-only'>Price:</dt>
          <dd className='product-item__price-current'>
            <span className='sr-only'>Current price is ${price}.</span>
            <span aria-hidden='true'>$ {price}</span>
          </dd>
        </dl>
      </Link>
      <button type='button' className='btn btn--card' data-button='primary'>
        <ShoppingCart></ShoppingCart>
        <span>Add to cart</span>
      </button>
    </article>
  )
}

export default ProductCard
