function formatId (id) {
  if (!id) return
  return id.slice(0, 8)
}

export default formatId
