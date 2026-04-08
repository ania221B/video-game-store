import { X } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { removeItem, updateItemQuantity } from './cartSlice'
import { QuantityControls } from '../../components/common'
import { Link } from 'react-router-dom'

function CartItem ({ item }) {
  const { cartId, productId, image, name, price, platform, quantity, slug } =
    item
  const dispatch = useDispatch()

  function removeFromCart () {
    dispatch(removeItem({ cartId }))
  }

  return (
    <li>
      <article className='cart__item'>
        <div className='cart__item__thumbnail'>
          <img src={image} alt={name} />
        </div>

        <dl className='cart__item__details'>
          <dt className='sr-only'>Name:</dt>
          <dd className='cart__item__name fs-500 fw-extra-bold'>
            <Link to={`/products/${productId}/${slug}`}>{name}</Link>
          </dd>

          <dt className='cart__item__platform sr-only'>Platform:</dt>
          <dd className='cart__item__platform'>{platform.name}</dd>

          <dt className='cart__item__price '>Price:</dt>
          <dd className='cart__item__price cart__item__price-value fs-500 fw-extra-bold'>
            ${price.toFixed(2)}
          </dd>
        </dl>

        <QuantityControls
          quantity={quantity}
          onChange={value =>
            dispatch(updateItemQuantity({ cartId, quantity: value }))
          }
          onDecrease={() =>
            dispatch(updateItemQuantity({ cartId, quantity: quantity - 1 }))
          }
          onIncrease={() =>
            dispatch(updateItemQuantity({ cartId, quantity: quantity + 1 }))
          }
        ></QuantityControls>

        <dl className='cart__item__total-price'>
          <dt>Item total:</dt>
          <dd className='fs-500 fw-extra-bold'>
            ${(quantity * price).toFixed(2)}
          </dd>
        </dl>
        <button
          type='button'
          className='cart__item__remove-btn btn'
          aria-label='remove item from the cart'
          data-button='primary'
          onClick={removeFromCart}
        >
          <span>
            <X size={16}></X>
          </span>
          <span>
            <X size={16}></X>
          </span>
        </button>
      </article>
    </li>
  )
}

export default CartItem
