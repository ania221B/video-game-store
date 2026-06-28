import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { singleOrderQuery } from '../api/queries'
import { formatId } from '../utils'
import { CheckoutItem } from '../components/ui'
import { ArrowLeft } from 'lucide-react'

function SingleOrder () {
  const { id } = useParams()
  const { data: order } = useQuery(singleOrderQuery(id))

  const orderItems = order?.order_items || []
  const orderDate = new Date(order?.created_at).toLocaleDateString('en-US')

  return (
    <section className='section'>
      <div className='container'>
        <article className='order'>
          <header>
            <h1>Order #{formatId(id)}</h1>

            <Link
              to='/orders'
              className='btn'
              data-button='outline'
              aria-labels='Go back to all orders'
            >
              <span>
                <ArrowLeft></ArrowLeft>
              </span>
              <span>Back to orders</span>
            </Link>
          </header>
        </article>

        <div className='padding-block-start-48'>
          <ul className='order__list'>
            {orderItems.map(item => {
              return <CheckoutItem key={item.cartId} item={item}></CheckoutItem>
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default SingleOrder
