import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

function CheckoutItem ({ item }) {
  const { cartId, productId, image, name, price, platform, quantity, slug } =
    item

  return (
    <li>
      <article className='order__item'>
        <div className='order__item__thumbnail'>
          <img src={image} alt={name} />
        </div>

        <dl className='order__item__details'>
          <dt className='sr-only'>Name:</dt>
          <dd className='order__item__name fs-600 fw-extra-bold'>
            <Link to={`/products/${productId}/${slug}`}>{name}</Link>
          </dd>

          <dt className='order__item__platform sr-only'>Platform:</dt>
          <dd className='order__item__platform'>{platform.name}</dd>

          <dt className='order__item__price'>Price:</dt>
          <dd className='order__item__price order__item__price-value fw-extra-bold'>
            ${price}
          </dd>

          <dt className='order__item__quantity'>Quantity:</dt>
          <dd className='order__item__quantity order__item__quantity-value fw-extra-bold'>
            x {quantity}
          </dd>
        </dl>

        <dl className='order__item__total-price padding-block-start-12'>
          <dt className='fs-400 fw-extra-bold'>Item total:</dt>
          <dd className='fs-500 fw-extra-bold'>
            ${(quantity * price).toFixed(2)}
          </dd>
        </dl>
      </article>
    </li>
  )
}

export default CheckoutItem
