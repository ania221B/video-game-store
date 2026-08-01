import { useLoaderData } from 'react-router-dom'
import { gamesQuery } from '../api'
import { HeroImage, Pagination, SearchBar } from '../components/ui'
import { ProductList } from '../components/lists'
import FilterMenu from '../components/common/FilterMenu'
import { heroImages } from '../data'
import { useQuery } from '@tanstack/react-query'
import { Loader } from '../components/common'

function Products () {
  const params = useLoaderData()
  const { data: gamesData, isLoading } = useQuery(gamesQuery(params))

  if (isLoading) return <Loader></Loader>

  const products = gamesData?.results || []
  const count = gamesData?.count ? gamesData.count : 0
  const isPreviousPage = gamesData?.previous?.length
    ? gamesData.previous.length
    : null
  const isNextPage = gamesData?.next?.length ? gamesData.next.length : null

  const metaData = {
    count,
    isPreviousPage,
    isNextPage
  }

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
            <Pagination data={metaData}></Pagination>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Products
