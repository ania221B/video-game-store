import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { CheckoutItem } from '../components/ui'
import { saveOrder } from '../api'
import { clearCart } from '../features'

function Checkout () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cartItems, cartItemsCount, cartTotal } = useSelector(
    store => store.cart
  )

  async function placeOrder () {
    const orderId = await saveOrder(cartItems)
    dispatch(clearCart())
    navigate('/checkout/thank-you', { state: { orderId } })
  }

  return (
    <section className='section'>
      <div className='container' data-container='x-small'>
        <article className='order'>
          <header>
            <h1 className='order__title fs-800'>
              Your order ({cartItemsCount})
            </h1>

            <Link
              to='/cart'
              className='btn'
              data-button='outline'
              aria-label='Go back to cart so as to edit items'
            >
              <span className='arrow-left'>
                <ArrowLeft></ArrowLeft>
              </span>
              <span>Go back to edit cart</span>
            </Link>
          </header>

          <div className='padding-block-start-24'>
            <ul className='order__list'>
              {cartItems.map(item => {
                return (
                  <CheckoutItem key={item.cartId} item={item}></CheckoutItem>
                )
              })}
            </ul>
            <p className='cart__total'>
              <span className='fs-500'>Order total:</span>
              <span className='fs-700 fw-extra-bold'>
                ${cartTotal.toFixed(2)}
              </span>
            </p>
          </div>

          <button
            type='button'
            className='btn'
            data-button='primary'
            onClick={placeOrder}
          >
            <span>Confirm order</span>
            <span aria-hidden='true'>Confirm order</span>
          </button>
        </article>
      </div>
    </section>
  )
}

export default Checkout
