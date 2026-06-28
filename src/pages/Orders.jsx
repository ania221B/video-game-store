import { useQuery } from '@tanstack/react-query'
import { ordersQuery } from '../api/queries'
import { Link } from 'react-router-dom'
import { formatId } from '../utils'

export const loader = queryClient => async () => {
  await queryClient.ensureQueryData(ordersQuery())
  return null
}

function Orders () {
  const { data: orders, isLoading, isError } = useQuery(ordersQuery())

  const ordersCount = orders?.length || 0
  return (
    <section className='section'>
      <div className='container' data-container='small'>
        <article>
          <header>
            <h1>Your Orders ({ordersCount})</h1>
          </header>

          <div className='padding-block-start-48'>
            {ordersCount === 0 ? (
              <div>
                <h2>You don't have orders yet</h2>
                <p>Place an order to see your purchase here.</p>
              </div>
            ) : (
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
                      (sum, item) =>
                        sum + parseFloat(item.price) * item.quantity,
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
                        <td>
                          {new Date(items.created_at).toLocaleDateString(
                            'en-US'
                          )}
                        </td>
                        <td>${total.toFixed(2)}</td>
                        <td>{amount}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        </article>
      </div>
    </section>
  )
}

export default Orders
