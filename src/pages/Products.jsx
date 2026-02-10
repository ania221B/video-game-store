import { useLoaderData } from 'react-router-dom'
import { gamesApi } from '../api'
import { Pagination } from '../components/ui'
import { ProductList } from '../components/lists'
import FilterMenu from '../components/common/FilterMenu'
import SearchBar from '../components/ui/SearchBar'

export async function loader ({ request }) {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries()
  ])
  const page = Number(params.page ?? 1)

  const { data } = await gamesApi.get('/games', {
    params: {
      page_size: 20,
      ...params,
      page
    }
  })

  return data
}

function Products () {
  const data = useLoaderData()
  const products = data.results

  return (
    <section className='section'>
      <div className='container' data-container='large'>
        <header>
          <h1>All Games</h1>
          <p>some text</p>
        </header>
        <div className='catalog-grid'>
          <FilterMenu></FilterMenu>
          <SearchBar></SearchBar>
          <div className='item-area'>
            <ProductList products={products}></ProductList>
          </div>
          <Pagination></Pagination>
        </div>
      </div>
    </section>
  )
}

export default Products
