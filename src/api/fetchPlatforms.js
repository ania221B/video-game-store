import { gamesApi } from './gamesApi'

export async function fetchPlatforms () {
  const { data } = await gamesApi.get('/platforms')

  return data
}
