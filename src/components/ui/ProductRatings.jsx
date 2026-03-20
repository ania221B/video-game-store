import { Star } from 'lucide-react'

function ProductRatings ({ rating, metacritic }) {
  return (
    <div className='product__ratings'>
      <dl className='product__rating'>
        <dt className='uppercase letter-spacing-1'>Rating</dt>
        {rating !== null ? (
          <dd>
            <span className='sr-only'>Rated {rating} out of 5 stars.</span>
            <span aria-hidden='true'>{rating}</span>
            <span className='product__star' aria-hidden='true'>
              {Array.from({ length: 5 }, (_, index) => {
                return <Star key={`star-${index}`}></Star>
              })}
            </span>
          </dd>
        ) : (
          <dd>
            <span className='sr-only'>Score unavailable.</span>
            <span aria-hidden='true'>--</span>
          </dd>
        )}
      </dl>
      <dl className='product__rating'>
        <dt className='uppercase letter-spacing-1'>Metacritic score</dt>
        {metacritic !== null ? (
          <dd>
            <span className='sr-only'>Scored {metacritic}% out of 100%.</span>
            <span aria-hidden='true'>{metacritic}%</span>
          </dd>
        ) : (
          <dd>
            <span className='sr-only'>Score unavailable.</span>
            <span aria-hidden='true'>--</span>
          </dd>
        )}
      </dl>
    </div>
  )
}

export default ProductRatings
