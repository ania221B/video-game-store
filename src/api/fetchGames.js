import { gamesApi } from './gamesApi'

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
  const { data } = await gamesApi.get('/games', {
    params: {
      page_size: 20,
      ...params,
      page
    }
  })
  return data
}

export async function fetchNewestGames () {
  const { data } = await gamesApi.get('/games', {
    params: {
      dates: `${formatDate(lastWeek)},${formatDate(today)}`,
      ordering: '-released',
      page_size: 20
    }
  })
  return data
}

export async function fetchTrendingGames () {
  const { data } = await gamesApi.get('/games', {
    params: {
      dates: `${formatDate(sixMonthsAgo)},${formatDate(today)}`,
      ordering: '-added',
      page_size: 20
    }
  })
  return data
}

export async function fetchCriticallyAcclaimedGames () {
  const { data } = await gamesApi.get('/games', {
    params: {
      ordering: '-metacritic',
      metacritic: '80,100',
      page_size: 20
    }
  })

  return data
}

export async function fetchSingleGame (id) {
  const { data } = await gamesApi.get(`/games/${id}`)

  return data
}

export async function fetchScreenshots (id) {
  const { data } = await gamesApi.get(`/games/${id}/screenshots`)

  return data
}
