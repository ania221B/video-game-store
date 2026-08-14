import { gamesApi } from './gamesApi'
import { mockFetchPlatforms } from './mockGamesApi'

export async function fetchPlatforms () {
  try {
    const { data } = await gamesApi.get('/platforms')

    return data
  } catch (error) {
    console.warn('RAWG API unreachagble, using local data', error)
    return mockFetchPlatforms()
  }
}
