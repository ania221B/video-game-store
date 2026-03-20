function ProductGallery ({ gameName, gameScreenshots }) {
  return (
    <section className='product__gallery'>
      <h2 className='product__title fs-700'>Gallery</h2>
      <ul className='grid-auto-fit' style={{ marginBlockStart: '1.5rem' }}>
        {gameScreenshots.map((screenshot, index) => {
          return (
            <li key={`screenhot-${index}`}>
              <img src={screenshot.image} alt={`image from ${gameName}`}></img>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default ProductGallery
