import { gamesApi } from './gamesApi'

export async function fetchTags (page) {
  const data = await gamesApi.get('/tags', {
    params: {
      page: page,
      page_size: 50
    }
  })

  return data
}
