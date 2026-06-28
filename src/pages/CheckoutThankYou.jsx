import React from 'react'
import { useLocation } from 'react-router-dom'
import { formatId } from '../utils'

function CheckoutThankYou () {
  const { state } = useLocation()
  return (
    <section className='section thank-you'>
      <div className='container fs-500 flow' data-container='x-small'>
        <header className='flow'>
          <h1 className='fs-800'>Order confirmed!</h1>
          <p>
            Thank you for your purchase. Your order has been received and is
            being processed.
          </p>
        </header>
        <p className='fs-600 fw-bold'>
          Order number: #{formatId(state.orderId)}
        </p>
        <p>
          Keep this number for your records. You'll receive a confirmation email
          shortly.
        </p>
        <p className='closing'>Happy gaming!</p>
      </div>
    </section>
  )
}

export default CheckoutThankYou
