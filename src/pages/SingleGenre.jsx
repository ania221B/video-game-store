import { useQuery } from '@tanstack/react-query'
import { gamesQuery, singleGenreQuery } from '../api'
import { ProductList } from '../components/lists'
import { Pagination, SearchBar } from '../components/ui'
import { useParams, useSearchParams } from 'react-router-dom'
import { Loader } from '../components/common'

export const loader =
  queryClient =>
  async ({ params, request }) => {
    const { id, slug } = params

    const searchParams = Object.fromEntries(new URL(request.url).searchParams)

    const genreParams = { ...searchParams, genres: slug }

    await Promise.all([
      queryClient.ensureQueryData(singleGenreQuery(id)),
      queryClient.ensureQueryData(gamesQuery(genreParams))
    ])

    return null
  }

function SingleGenre () {
  const { id, slug } = useParams()
  const [searchParams] = useSearchParams()
  const allParams = Object.fromEntries(searchParams)

  const genreQuery = useQuery(singleGenreQuery(id))
  const genreGamesQuery = useQuery(gamesQuery({ ...allParams, genres: slug }))

  const isLoading = genreQuery.isLoading || genreGamesQuery.isLoading

  if (isLoading) return <Loader></Loader>

  const genre = genreQuery.data || {}
  const { name, games_count, image_background, description } = genre

  const genreGamesData = genreGamesQuery.data
  const genreGames = genreGamesData?.results || []
  const count = genreGamesData?.count ? genreGamesData.count : 0
  const isPreviousPage = genreGamesData?.previous?.length
    ? genreGamesData.length
    : null
  const isNextPage = genreGamesData?.next?.length
    ? genreGamesData.next.length
    : null

  const metaData = {
    count,
    isPreviousPage,
    isNextPage
  }

  const genreDescription = description
    .replace(/<br\s*\/?>/gi, '\n')
    .split('\n')
    .map(item =>
      item
        .replace(/<[^>]+>/g, '')
        .replace('&#39;', "'")
        .replace('&quot;', '"')
        .replace('&amp;', '&')
        .trim()
    )
    .filter(Boolean)

  return (
    <section>
      <div className='container' data-container='large'>
        <header className='page-header stack-grid'>
          <div className='main-content section flow'>
            <h1>{name}</h1>
            <p className='main-content__subtitle'>
              Games in catalog: {games_count}
            </p>
            <p className='main-content__description'>{genreDescription}</p>
          </div>

          <picture className='bg-img'>
            <img src={image_background} alt={name} />
          </picture>
        </header>
        <div className='catalog-grid--no-filters'>
          <SearchBar></SearchBar>
          <div className='item-area'>
            <ProductList products={genreGames}></ProductList>
            <Pagination data={metaData}></Pagination>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SingleGenre
