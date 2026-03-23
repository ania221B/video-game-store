import { useLoaderData } from 'react-router-dom'
import { gamesQuery } from '../api'
import { HeroImage, Pagination, SearchBar } from '../components/ui'
import { ProductList } from '../components/lists'
import FilterMenu from '../components/common/FilterMenu'
import { heroImages } from '../data'
import { platformsQuery } from '../api/queries'
import { useQuery } from '@tanstack/react-query'
import { Loader } from '../components/common'

export const loader =
  queryClient =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries()
    ])

    await Promise.all([
      queryClient.ensureQueryData(gamesQuery(params)),
      queryClient.ensureQueryData(platformsQuery())
    ])

    return params
  }

function Products () {
  const params = useLoaderData()
  const {
    data: gamesData,
    isLoading,
    isError,
    error
  } = useQuery(gamesQuery(params))

  if (isLoading) return <Loader></Loader>
  if (isError) {
    console.log(error)
    return <p>Error!</p>
  }

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
