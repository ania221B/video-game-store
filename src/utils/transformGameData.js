import excludeTags from './excludeTags'
import generatePrice from './generatePrice'
import matchWords from './matchWords'

function transformGameData (data) {
  return {
    ...data,
    results: data.results
      .filter(game => excludeTags(game.tags))
      .filter(game => !matchWords(game.name))
      .map(game => ({
        ...game,
        price: generatePrice(game.id)
      }))
  }
}

export default transformGameData
