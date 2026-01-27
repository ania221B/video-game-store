import axios from 'axios'

const url = 'https://api.rawg.io/api/games'
export const gamesApi = axios.create({
  baseURL: url,
  params: {
    key: `${import.meta.env.VITE_RAWG_KEY}`,
    page: 1,
    page_size: 20
  }
})
