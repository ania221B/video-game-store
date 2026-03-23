import { gamesApi } from './gamesApi'

export async function fetchGenres () {
  const { data } = await gamesApi.get('/genres')

  return data
}
