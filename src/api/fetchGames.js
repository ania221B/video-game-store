import { gamesApi } from './gamesApi'
import {
  mockFetchCriticallyAcclaimedGames,
  mockFetchGames,
  mockFetchNewestGames,
  mockFetchScreenshots,
  mockFetchSingleGame,
  mockFetchTrendingGames
} from './mockGamesApi'

const today = new Date()
const year = today.getFullYear()
const month = today.getMonth()
const day = today.getDate()
const timestampForOneDay = 86400000
const lastWeek = new Date(today.getTime() - timestampForOneDay * 7)
const sixMonthsAgo = new Date(year, month - 6, day)

function formatDate (date) {
  return date.toISOString().split('T')[0]
}

export async function fetchGames (params) {
  const page = Number(params.page ?? 1)
  try {
    const { data } = await gamesApi.get('/games', {
      params: {
        page_size: 20,
        ...params,
        page
      }
    })
    return data
  } catch (error) {
    console.warn('RAWG API unreachable, using local data', error)
    return mockFetchGames({ ...params, page })
  }
}

export async function fetchNewestGames () {
  try {
    const { data } = await gamesApi.get('/games', {
      params: {
        dates: `${formatDate(lastWeek)},${formatDate(today)}`,
        ordering: '-released',
        page_size: 20
      }
    })
    return data
  } catch (error) {
    console.warn('RAWG API unreachable, using local data', error)
    return mockFetchNewestGames()
  }
}

export async function fetchTrendingGames () {
  try {
    const { data } = await gamesApi.get('/games', {
      params: {
        dates: `${formatDate(sixMonthsAgo)},${formatDate(today)}`,
        ordering: '-added',
        page_size: 20
      }
    })
    return data
  } catch (error) {
    console.warn('RAWG API unreachable, using local data', error)
    return mockFetchTrendingGames()
  }
}

export async function fetchCriticallyAcclaimedGames () {
  try {
    const { data } = await gamesApi.get('/games', {
      params: {
        ordering: '-metacritic',
        metacritic: '80,100',
        page_size: 20
      }
    })

    return data
  } catch (error) {
    console.warn('RAWG API unreachable, using local data', error)
    return mockFetchCriticallyAcclaimedGames()
  }
}

export async function fetchSingleGame (id) {
  try {
    const { data } = await gamesApi.get(`/games/${id}`)

    return data
  } catch (error) {
    console.warn('RAWG API unreachable, using local data', error)
    return mockFetchSingleGame(id)
  }
}

export async function fetchScreenshots (id) {
  try {
    const { data } = await gamesApi.get(`/games/${id}/screenshots`)

    return data
  } catch (error) {
    console.warn('RAWG API unreachable, using local data', error)
    return mockFetchScreenshots(id)
  }
}
