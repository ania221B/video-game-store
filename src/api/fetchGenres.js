import { gamesApi } from './gamesApi'
import { mockFetchGenres, mockFetchSingleGenre } from './mockGamesApi'

export async function fetchGenres () {
  try {
    const { data } = await gamesApi.get('/genres')

    return data
  } catch (error) {
    console.warn('RAWG API unreachable, using local data', error)
    return mockFetchGenres()
  }
}

export async function fetchSingleGenre (id) {
  try {
    const { data } = await gamesApi.get(`/genres/${id}`)

    return data
  } catch (error) {
    console.warn('RAWG API unreachable, using local data', error)
    return mockFetchSingleGenre(id)
  }
}
