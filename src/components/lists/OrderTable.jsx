import React from 'react'
import { Link } from 'react-router-dom'
import { formatId } from '../../utils'

function OrderTable ({ orders, ordersCount }) {
  if (ordersCount === 0) {
    return (
      <div className='text-center padding-block-start-48 flow'>
        <h2 className='fs-600'>You don't have orders yet</h2>
        <p className='fs-500'>Place an order to see your purchase here.</p>
      </div>
    )
  }
  return (
    <table className='orders-table'>
      <thead>
        <tr>
          <th scope='col'>Order no.</th>
          <th scope='col'>Order Date</th>
          <th scope='col'>Order Total</th>
          <th scope='col'>Order Amount</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(items => {
          const total = items.order_items.reduce(
            (sum, item) => sum + parseFloat(item.price) * item.quantity,
            0
          )
          const amount = items.order_items.length
          const displayId = formatId(items.id)

          return (
            <tr key={items.id}>
              <th scope='row'>
                <Link
                  to={`/orders/${items.id}`}
                  className='btn'
                  data-button='outline'
                  aria-label='Display order details'
                >
                  {displayId}
                </Link>
              </th>
              <td>{new Date(items.created_at).toLocaleDateString('en-US')}</td>
              <td>${total.toFixed(2)}</td>
              <td>{amount}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default OrderTable
