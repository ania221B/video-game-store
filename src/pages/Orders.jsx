import { useQuery } from '@tanstack/react-query'
import { ordersQuery } from '../api/queries'
import { Link } from 'react-router-dom'
import { formatId } from '../utils'
import { OrderTable } from '../components/lists'

export const loader = queryClient => async () => {
  await queryClient.ensureQueryData(ordersQuery())
  return null
}

function Orders () {
  const { data: orders, isLoading, isError } = useQuery(ordersQuery())
  const ordersCount = orders?.length || 0

  return (
    <section
      className='section'
      style={{
        blockSize: '100%'
      }}
    >
      <div className='container' data-container='small'>
        <article>
          <header>
            <h1 className='fs-700'>Your Orders ({ordersCount})</h1>
          </header>

          <div className='padding-block-start-48'>
            <OrderTable orders={orders} ordersCount={ordersCount}></OrderTable>
          </div>
        </article>
      </div>
    </section>
  )
}

export default Orders
