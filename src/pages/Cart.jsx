import { useDispatch, useSelector } from 'react-redux'
import { CartItem, clearCart } from '../features'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

function Cart () {
  const dispatch = useDispatch()
  const { cartItems, cartItemsCount, cartTotal } = useSelector(
    store => store.cart
  )
  const isEmpty = cartItems.length === 0

  function removeAllCartItems () {
    dispatch(clearCart())
  }
  return (
    <section className='section'>
      <div className='container' data-container='x-small'>
        {isEmpty ? (
          <article className='cart cart--empty'>
            <h2 className='cart__title fs-800'>Your cart ({cartItemsCount})</h2>

            <div>
              <p className='cart__subtitle fs-600'>
                Your cart is currently empty.
              </p>
              <p>Any added items will appear here.</p>
            </div>
            <Link
              to='/products'
              className='btn'
              data-button='primary'
              aria-label='go back to store to start shopping'
            >
              <span>Start shopping</span>
              <span>Start shopping</span>
            </Link>
          </article>
        ) : (
          <article className='cart'>
            <header>
              <h2 className='cart__title fs-800'>
                Your Cart ({cartItemsCount})
              </h2>

              <Link
                to='/products'
                className='btn'
                data-button='outline'
                aria-label='go back to store to continue shopping'
              >
                <span>Continue shopping</span>
                <span className='arrow-right'>
                  <ArrowRight></ArrowRight>
                </span>
              </Link>
            </header>
            <div className='padding-block-start-24'>
              <ul className='cart__list'>
                {cartItems.map(item => {
                  return <CartItem key={item.cartId} item={item}></CartItem>
                })}
              </ul>
              <p className='cart__total'>
                <span className='fs-500'>Order total:</span>
                <span className='fs-700 fw-extra-bold'>
                  ${cartTotal.toFixed(2)}
                </span>
              </p>
            </div>
            <Link to='/checkout' className='btn' data-button='secondary'>
              Place order
            </Link>

            <button
              type='button'
              className='btn'
              data-button='primary'
              onClick={removeAllCartItems}
            >
              <span> Clear cart</span>
              <span aria-hidden='true'> Clear cart</span>
            </button>
          </article>
        )}
      </div>
    </section>
  )
}

export default Cart
