import { gamesApi } from './gamesApi'

export async function fetchGenres () {
  const { data } = await gamesApi.get('/genres')

  return data
}

export async function fetchSingleGenre (id) {
  const { data } = await gamesApi.get(`/genres/${id}`)

  return data
}
