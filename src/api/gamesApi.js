import axios from 'axios'

const url = 'https://api.rawg.io/api'
export const gamesApi = axios.create({
  baseURL: url,
  params: {
    key: `${import.meta.env.VITE_RAWG_KEY}`
  }
})
