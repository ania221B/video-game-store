import { useLoaderData } from 'react-router-dom'
import { gamesApi } from '../api'
import { HeroImage, Pagination, SearchBar } from '../components/ui'
import { ProductList } from '../components/lists'
import FilterMenu from '../components/common/FilterMenu'
import { heroImages } from '../data'

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
    <section>
      <div className='container' data-container='large'>
        <header className='page-header stack-grid'>
          <div className='main-content'>
            <h1>
              Which game will be your <span>next</span>?
            </h1>
          </div>
          <HeroImage image={heroImages.products} imgClass='bg-img'></HeroImage>
        </header>
        <div className='catalog-grid'>
          <FilterMenu></FilterMenu>
          <SearchBar></SearchBar>
          <div className='item-area'>
            <ProductList products={products}></ProductList>
            <Pagination></Pagination>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Products
