function ProductDescription ({ description }) {
  const paragraphs = description
    .replace(/<br\s*\/?>/gi, '\n')
    .split('\n')
    .map(item => item.replace(/<[^>]+>/g, '').trim())
    .filter(Boolean)

  function isHeading (text) {
    return /^[♞♝♚♛]/.test(text)
  }
  return (
    <section className='product__description flow'>
      <h2 className='product__title fs-700'>About the game</h2>
      <div className='product__description-text'>
        {paragraphs.map((paragraph, index) =>
          isHeading(paragraph) ? (
            <h3 key={`heading-${index}`}>{paragraph.slice(1).trim()}</h3>
          ) : (
            <p key={`paragraph-${index}`}>{paragraph}</p>
          )
        )}
      </div>
    </section>
  )
}

export default ProductDescription
