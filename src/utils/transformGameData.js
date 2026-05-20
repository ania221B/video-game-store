import excludeTags from './excludeTags'
import generatePrice from './generatePrice'
import matchWords from './matchWords'

function transformGameData (data) {
  return {
    ...data,
    results: data.results
      .filter(game => !matchWords(game.slug))
      .filter(game => !matchWords(game.name))
      .filter(game => excludeTags(game.tags))
      .map(game => ({
        ...game,
        price: generatePrice(game.id)
      }))
  }
}

export default transformGameData
