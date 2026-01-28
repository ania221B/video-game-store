import { useLoaderData } from 'react-router-dom'
import { gamesApi } from '../api'
import { Pagination, ProductCard } from '../components/ui'

export async function loader ({ request }) {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries()
  ])
  const page = Number(params.page ?? 1)

  const { data } = await gamesApi.get('', {
    params: {
      ...params,
      page
    }
  })
  console.log(data)

  return data
}

function Products () {
  const data = useLoaderData()
  const products = data.results
  return (
    <section className='section'>
      <div className='container'>
        <header>
          <h1>All Games</h1>
          <p>some text</p>
        </header>
        <div className='catalog-grid'>
          <div className='item-area'>
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

          <Pagination></Pagination>
        </div>
      </div>
    </section>
  )
}

export default Products
