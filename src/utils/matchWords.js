function matchWords (text) {
  const words = [
    'hentai',
    'creampie',
    'sex',
    'hottie',
    'hot-champions',
    'hot-wrestling',
    'hot-gym',
    'hot-21',
    'steamy-hot-springs',
    'steamy-conversation',
    'hot-steamy-knights'
  ]
  return words.some(
    element => text.toLowerCase().search(new RegExp(element, 'i')) !== -1
  )
}

export default matchWords
