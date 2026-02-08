function checkIndex (index, list) {
  if (typeof index !== 'number') return

  if (index < 0) {
    return list.length - 1
  }
  if (index > list.length - 1) {
    return 0
  }

  return index
}
export default checkIndex
