function generatePrice (id) {
  return ((id % 40) + 10).toFixed(2)
}

export default generatePrice
