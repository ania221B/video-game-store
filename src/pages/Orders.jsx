import { useQuery } from '@tanstack/react-query'
import { ordersQuery } from '../api'
import { Link } from 'react-router-dom'
import { formatId } from '../utils'
import { OrderTable } from '../components/lists'

function Orders () {
  const { data: orders, isLoading, isError } = useQuery(ordersQuery())
  const ordersCount = orders?.length || 0

  return (
    <section className='section orders'>
      <div className='container' data-container='small'>
        <article>
          <header>
            <h1 className='fs-700'>Your Orders ({ordersCount})</h1>
          </header>

          <div className='table-wrapper padding-block-48'>
            <OrderTable orders={orders} ordersCount={ordersCount}></OrderTable>
          </div>
        </article>
      </div>
    </section>
  )
}

export default Orders
