function matchWords (text) {
  const words = [
    'acting-lessons',
    'creampie',
    'cum',
    'dirty-dice',
    'flirt',
    'harem',
    'hentai',
    'hot-champions',
    'hot-gym',
    'hottie',
    'hot-21',
    'hot-wrestling',
    'hot-steamy-knights',
    'intimate-vreisuke',
    'intimate-winter',
    'maid-mansion',
    'personality-excretion-hero-silvys',
    'pussy-2',
    'sex',
    'steamy-hot-springs',
    'steamy-conversation',
    'tit'
  ]
  return words.some(
    element => text.toLowerCase().search(new RegExp(element, 'i')) !== -1
  )
}

export default matchWords
