function excludeTags (tags) {
  const toExclude = [
    'adult',
    'crush',
    'dating-sim',
    'eroge',
    'erotic',
    'hentai',
    'nsfw',
    'porn',
    'sex',
    'sexual',
    'sexual-content',
    'xxx'
  ]
  return !tags.some(tag => toExclude.includes(tag.slug))
}

export default excludeTags
