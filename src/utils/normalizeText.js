function normalizeText (text) {
  return text
    .replace(/<br\s*\/?>/gi, '\n')
    .split('\n')
    .map(item =>
      item
        .replace(/<[^>]+>/g, '')
        .replace('&#39;', "'")
        .replace('&quot;', '"')
        .replace('&amp;', '&')
        .trim()
    )
    .filter(Boolean)
}

export default normalizeText
