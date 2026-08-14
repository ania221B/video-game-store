import { gamesApi } from './gamesApi'
import { mockFetchTags } from './mockGamesApi'

export async function fetchTags (page) {
  try {
    const { data } = await gamesApi.get('/tags', {
      params: {
        page: page,
        page_size: 50
      }
    })

    return data
  } catch (error) {
    console.warn('RAWG API unreachable, using local data', error)
    return mockFetchTags()
  }
}
