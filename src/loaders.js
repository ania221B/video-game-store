import {
  criticallyAcclaimedGamesQuery,
  gamesQuery,
  genresQuery,
  newestGamesQuery,
  ordersQuery,
  platformsQuery,
  screenshotsQuery,
  singleGameQuery,
  singleGenreQuery,
  trendingGamesQuery,
  wishlistQuery
} from './api'

export const genresLoader = queryClient => async () => {
  await queryClient.ensureQueryData(genresQuery())
  return null
}
export const landingLoader = queryClient => async () => {
  await Promise.all([
    queryClient.ensureQueryData(newestGamesQuery()),
    queryClient.ensureQueryData(trendingGamesQuery()),
    queryClient.ensureQueryData(criticallyAcclaimedGamesQuery())
  ])
  return null
}

export const productsLoader =
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

export const singleProductLoader = queryClient =>
  async function ({ params }) {
    const { id } = params

    await Promise.all([
      queryClient.ensureQueryData(singleGameQuery(id)),
      queryClient.ensureQueryData(screenshotsQuery(id))
    ])

    return id
  }

export const singleGenreLoader =
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

export const wishlistLoader = queryClient => async () => {
  await queryClient.ensureQueryData(wishlistQuery())
  return null
}

export const ordersLoader = queryClient => async () => {
  await queryClient.ensureQueryData(ordersQuery())
  return null
}
