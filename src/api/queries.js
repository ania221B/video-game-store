import {
  fetchCriticallyAcclaimedGames,
  fetchGames,
  fetchNewestGames,
  fetchScreenshots,
  fetchSingleGame,
  fetchTrendingGames
} from './fetchGames'
import { fetchGenres, fetchSingleGenre } from './fetchGenres'
import { fetchPlatforms } from './fetchPlatforms'

export function genresQuery () {
  return {
    queryKey: ['genres'],
    queryFn: fetchGenres
  }
}

export function singleGenreQuery (id) {
  return {
    queryKey: ['genre', id],
    queryFn: () => fetchSingleGenre(id)
  }
}

export function gamesQuery (params) {
  return {
    queryKey: ['games', params],
    queryFn: () => fetchGames(params)
  }
}

export function newestGamesQuery () {
  return {
    queryKey: ['games', 'newest'],
    queryFn: fetchNewestGames
  }
}

export function trendingGamesQuery () {
  return {
    queryKey: ['games', 'trending'],
    queryFn: fetchTrendingGames
  }
}

export function criticallyAcclaimedGamesQuery () {
  return {
    queryKey: ['games', 'criticallyAcclaimed'],
    queryFn: fetchCriticallyAcclaimedGames
  }
}
export function singleGameQuery (id) {
  return {
    queryKey: ['game', id],
    queryFn: () => fetchSingleGame(id)
  }
}

export function platformsQuery () {
  return {
    queryKey: ['platforms'],
    queryFn: fetchPlatforms
  }
}

export function screenshotsQuery (id) {
  return {
    queryKey: ['screenshots', id],
    queryFn: () => fetchScreenshots(id)
  }
}
