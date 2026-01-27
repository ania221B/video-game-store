import { useLoaderData } from 'react-router-dom'
import { gamesApi } from '../api'
import { ProductCard } from '../components/ui'

export async function loader () {
  const { data } = await gamesApi.get('')
  return data.results
}

function Products () {
  const products = useLoaderData()
  return (
    <section className='section'>
      <div className='container'>
        <header>
          <h1>All Games</h1>
          <p>some text</p>
        </header>
        <div className='catalog-grid'>
          <ul className='item-area__list grid-auto-fit'>
            {products.map(product => {
              return (
                <li key={product.id}>
                  <ProductCard item={product}></ProductCard>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Products
