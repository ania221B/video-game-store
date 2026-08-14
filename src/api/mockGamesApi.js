// mockGamesApi.js
// Local fallback data, used only when the real RAWG API (gamesApi) is unreachable.
// Every function here mirrors the shape of the matching real fetch function,
// so callers in fetchGames.js / fetchGenres.js / fetchPlatforms.js / fetchTags.js
// get the same response structure whether the data came from RAWG or from here.
//
// Images are seeded placeholders (picsum.photos), not real RAWG screenshots.

function img (seed, w = 460, h = 215) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`
}

const GENRES = [
  {
    id: 4,
    name: 'Action',
    slug: 'action',
    games_count: 179085,
    image_background: img('action'),
    description:
      '<p>Action games are about physical challenges, including hand-eye coordination and reaction-time.</p>'
  },
  {
    id: 51,
    name: 'Indie',
    slug: 'indie',
    games_count: 76747,
    image_background: img('indie'),
    description:
      '<p>Indie games are made by independent developers, often without a major publisher.</p>'
  },
  {
    id: 3,
    name: 'Adventure',
    slug: 'adventure',
    games_count: 132906,
    image_background: img('adventure'),
    description:
      '<p>Adventure games focus on puzzle-solving, exploration, and narrative within a game world.</p>'
  },
  {
    id: 5,
    name: 'RPG',
    slug: 'role-playing-games-rpg',
    games_count: 55065,
    image_background: img('rpg'),
    description:
      '<p>Role-playing games let you develop a character or party of characters through a story.</p>'
  },
  {
    id: 10,
    name: 'Strategy',
    slug: 'strategy',
    games_count: 40199,
    image_background: img('strategy'),
    description:
      '<p>Strategy games emphasize skillful thinking and planning over direct action.</p>'
  },
  {
    id: 2,
    name: 'Shooter',
    slug: 'shooter',
    games_count: 55074,
    image_background: img('shooter'),
    description:
      '<p>Shooter games center on weapon-based combat, from close quarters to ranged engagements.</p>'
  },
  {
    id: 40,
    name: 'Casual',
    slug: 'casual',
    games_count: 62396,
    image_background: img('casual'),
    description:
      '<p>Casual games are easy to learn and quick to play, needing no special skills.</p>'
  },
  {
    id: 14,
    name: 'Simulation',
    slug: 'simulation',
    games_count: 55536,
    image_background: img('simulation'),
    description:
      '<p>Simulation games recreate real-world or fictional activities and systems.</p>'
  },
  {
    id: 7,
    name: 'Puzzle',
    slug: 'puzzle',
    games_count: 39346,
    image_background: img('puzzle'),
    description:
      '<p>Puzzle games challenge logic, pattern recognition, and problem-solving.</p>'
  },
  {
    id: 83,
    name: 'Platformer',
    slug: 'platformer',
    games_count: 55491,
    image_background: img('platformer'),
    description:
      '<p>Platformers involve jumping between platforms, ledges, and obstacles.</p>'
  }
]

const PLATFORMS = [
  {
    id: 4,
    name: 'PC',
    slug: 'pc',
    games_count: 534032,
    image_background: img('pc')
  },
  {
    id: 187,
    name: 'PlayStation 5',
    slug: 'playstation5',
    games_count: 1877,
    image_background: img('ps5')
  },
  {
    id: 18,
    name: 'PlayStation 4',
    slug: 'playstation4',
    games_count: 8523,
    image_background: img('ps4')
  },
  {
    id: 1,
    name: 'Xbox One',
    slug: 'xbox-one',
    games_count: 5768,
    image_background: img('xbone')
  },
  {
    id: 186,
    name: 'Xbox Series S/X',
    slug: 'xbox-series-x',
    games_count: 1200,
    image_background: img('xsx')
  },
  {
    id: 7,
    name: 'Nintendo Switch',
    slug: 'nintendo-switch',
    games_count: 5758,
    image_background: img('switch')
  }
]

const TAGS = [
  {
    id: 31,
    name: 'Singleplayer',
    slug: 'singleplayer',
    games_count: 210000,
    image_background: img('tag-sp')
  },
  {
    id: 40847,
    name: 'Steam Achievements',
    slug: 'steam-achievements',
    games_count: 95000,
    image_background: img('tag-ach')
  },
  {
    id: 40836,
    name: 'Full controller support',
    slug: 'full-controller-support',
    games_count: 60000,
    image_background: img('tag-ctrl')
  },
  {
    id: 42391,
    name: 'Steam Cloud',
    slug: 'steam-cloud',
    games_count: 51000,
    image_background: img('tag-cloud')
  },
  {
    id: 7,
    name: 'Multiplayer',
    slug: 'multiplayer',
    games_count: 45000,
    image_background: img('tag-mp')
  }
]

function platformEntries (ids) {
  return ids.map(id => ({ platform: PLATFORMS.find(p => p.id === id) }))
}

function makeGame (overrides) {
  return {
    id: overrides.id,
    slug: overrides.slug,
    name: overrides.name,
    released: overrides.released || '2022-01-01',
    tba: false,
    background_image: img(overrides.slug),
    rating: overrides.rating ?? 4.2,
    rating_top: 5,
    ratings_count: overrides.ratings_count ?? 230,
    added: 5400,
    metacritic: overrides.metacritic ?? 82,
    playtime: overrides.playtime ?? 14,
    platforms: platformEntries(overrides.platformIds || [4, 18, 1]),
    genres: overrides.genres,
    tags: overrides.tags || TAGS.slice(0, 3),
    short_screenshots: [
      { id: -1, image: img(overrides.slug) },
      { id: 1, image: img(overrides.slug + '-2') },
      { id: 2, image: img(overrides.slug + '-3') }
    ]
  }
}

const GAMES = [
  makeGame({
    id: 3498,
    slug: 'grand-theft-auto-v',
    name: 'Grand Theft Auto V',
    released: '2013-09-17',
    rating: 4.47,
    metacritic: 92,
    genres: [GENRES[0], GENRES[2]]
  }),
  makeGame({
    id: 4200,
    slug: 'portal-2',
    name: 'Portal 2',
    released: '2011-04-18',
    rating: 4.6,
    metacritic: 95,
    genres: [GENRES[8], GENRES[0]]
  }),
  makeGame({
    id: 3328,
    slug: 'the-witcher-3-wild-hunt',
    name: 'The Witcher 3: Wild Hunt',
    released: '2015-05-18',
    rating: 4.66,
    metacritic: 92,
    genres: [GENRES[3], GENRES[2]]
  }),
  makeGame({
    id: 5286,
    slug: 'tomb-raider',
    name: 'Tomb Raider',
    released: '2013-03-05',
    rating: 4.05,
    metacritic: 86,
    genres: [GENRES[0], GENRES[2]]
  }),
  makeGame({
    id: 4291,
    slug: 'counter-strike-global-offensive',
    name: 'Counter-Strike: Global Offensive',
    released: '2012-08-21',
    rating: 3.57,
    metacritic: 81,
    genres: [GENRES[5], GENRES[4]]
  }),
  makeGame({
    id: 12020,
    slug: 'left-4-dead-2',
    name: 'Left 4 Dead 2',
    released: '2009-11-16',
    rating: 4.09,
    metacritic: 89,
    genres: [GENRES[5], GENRES[0]]
  }),
  makeGame({
    id: 802,
    slug: 'borderlands-2',
    name: 'Borderlands 2',
    released: '2012-09-18',
    rating: 4.02,
    metacritic: 89,
    genres: [GENRES[0], GENRES[5]]
  }),
  makeGame({
    id: 13536,
    slug: 'portal',
    name: 'Portal',
    released: '2007-10-09',
    rating: 4.51,
    metacritic: 90,
    genres: [GENRES[8], GENRES[0]]
  }),
  makeGame({
    id: 4062,
    slug: 'bioshock-infinite',
    name: 'BioShock Infinite',
    released: '2013-03-26',
    rating: 4.39,
    metacritic: 94,
    genres: [GENRES[5], GENRES[0]]
  }),
  makeGame({
    id: 58175,
    slug: 'god-of-war',
    name: 'God of War',
    released: '2018-04-20',
    rating: 4.57,
    metacritic: 94,
    genres: [GENRES[0], GENRES[2]]
  }),
  makeGame({
    id: 22509,
    slug: 'insurgency',
    name: 'Insurgency',
    released: '2014-01-22',
    rating: 3.62,
    metacritic: 74,
    genres: [GENRES[5]]
  }),
  makeGame({
    id: 28,
    slug: 'red-dead-redemption-2',
    name: 'Red Dead Redemption 2',
    released: '2018-10-26',
    rating: 4.59,
    metacritic: 96,
    genres: [GENRES[0], GENRES[2]]
  })
]

function paginate (list, page = 1, pageSize = 20) {
  const start = (page - 1) * pageSize
  const results = list.slice(start, start + pageSize)
  return {
    count: list.length,
    next: start + pageSize < list.length ? page + 1 : null,
    previous: page > 1 ? page - 1 : null,
    results
  }
}

// Mirrors fetchGames(params) — honors search, genres, page
export async function mockFetchGames (params = {}) {
  let results = GAMES
  if (params.search) {
    const q = params.search.toLowerCase()
    results = results.filter(g => g.name.toLowerCase().includes(q))
  }
  if (params.genres) {
    const filters = String(params.genres).split(',')
    results = results.filter(g =>
      g.genres.some(
        gn => filters.includes(String(gn.id)) || filters.includes(gn.slug)
      )
    )
  }
  const page = Number(params.page ?? 1)
  return paginate(results, page, 20)
}

// Mirrors fetchNewestGames() — just returns most recently released
export async function mockFetchNewestGames () {
  const sorted = [...GAMES].sort(
    (a, b) => new Date(b.released) - new Date(a.released)
  )
  return paginate(sorted, 1, 20)
}

// Mirrors fetchTrendingGames() — sort by "added" desc
export async function mockFetchTrendingGames () {
  const sorted = [...GAMES].sort((a, b) => b.added - a.added)
  return paginate(sorted, 1, 20)
}

// Mirrors fetchCriticallyAcclaimedGames() — metacritic 80-100, sorted desc
export async function mockFetchCriticallyAcclaimedGames () {
  const filtered = GAMES.filter(g => g.metacritic >= 80).sort(
    (a, b) => b.metacritic - a.metacritic
  )
  return paginate(filtered, 1, 20)
}

// Mirrors fetchSingleGame(id) — accepts numeric id or slug
export async function mockFetchSingleGame (id) {
  const g = GAMES.find(
    game => String(game.id) === String(id) || game.slug === id
  )
  if (!g) throw new Error(`Mock game not found: ${id}`)
  return {
    ...g,
    description_raw:
      'Placeholder description standing in for the RAWG description_raw field. Swap in real copy if you have any saved.',
    description:
      '<p>Placeholder description standing in for the RAWG description field.</p><br><p>This is a second paragraph so the gallery/layout has something to render while the real API is unreachable.</p>',
    website: 'https://example.com',
    esrb_rating: { id: 4, name: 'Mature', slug: 'mature' },
    developers: [
      { id: 1, name: 'Placeholder Studio', slug: 'placeholder-studio' }
    ],
    publishers: [
      { id: 1, name: 'Placeholder Publishing', slug: 'placeholder-publishing' }
    ],
    tags: TAGS.slice(0, 3)
  }
}

// Mirrors fetchScreenshots(id)
export async function mockFetchScreenshots (id) {
  const g = GAMES.find(
    game => String(game.id) === String(id) || game.slug === id
  )
  if (!g) throw new Error(`Mock game not found: ${id}`)
  return {
    count: g.short_screenshots.length,
    results: g.short_screenshots.map(s => ({ id: s.id, image: s.image }))
  }
}

// Mirrors fetchGenres()
export async function mockFetchGenres () {
  return { count: GENRES.length, next: null, previous: null, results: GENRES }
}

// Mirrors fetchSingleGenre(id)
export async function mockFetchSingleGenre (id) {
  const g = GENRES.find(genre => String(genre.id) === String(id))
  if (!g) throw new Error(`Mock genre not found: ${id}`)
  return g
}

// Mirrors fetchPlatforms()
export async function mockFetchPlatforms () {
  return {
    count: PLATFORMS.length,
    next: null,
    previous: null,
    results: PLATFORMS
  }
}

// Mirrors fetchTags(page) — note: real fetchTags returns the whole axios response,
// not response.data (looks like a bug in the original — see note below).
export async function mockFetchTags () {
  return { count: TAGS.length, next: null, previous: null, results: TAGS }
}
