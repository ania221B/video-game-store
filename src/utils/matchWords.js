function matchWords (text) {
  const words = [
    'acting-lessons',
    'creampie',
    'cum',
    'dirty-dice',
    'flirt',
    'harem',
    'hentai',
    'horny',
    'hot-champions',
    'hot-gym',
    'hottie',
    'hot-21',
    'hot-wrestling',
    'hot-steamy-knights',
    'intimate-vreisuke',
    'intimate-winter',
    'love-death-realtime-lovers',
    'love-death-2-realtime-lovers',
    'maid-mansion',
    'personality-excretion-hero-silvys',
    'pimp-my-youtuber',
    'pussy-2',
    'sex',
    'steamy-hot-springs',
    'steamy-conversation',
    'tentacle-invasion',
    'tentacle-locker',
    'tentacles-of-submission',
    'tentacle-beach-party',
    'tit'
  ]
  return words.some(
    element => text.toLowerCase().search(new RegExp(element, 'i')) !== -1
  )
}

export default matchWords
