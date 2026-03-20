function ProductRequirementsButtons ({
  platformList,
  currentPlatformIndex,
  setCurrentPlatformIndex
}) {
  return (
    <div className='product__requirements__buttons' role='tablist'>
      {platformList.map((item, index) => {
        const { platform } = item
        return (
          <button
            key={platform.slug}
            type='button'
            className={`btn ${
              index === currentPlatformIndex ? 'active' : null
            }`}
            data-button='secondary'
            aria-controls={platform.slug}
            role='tab'
            onClick={() => setCurrentPlatformIndex(index)}
          >
            {platform.name}
          </button>
        )
      })}
    </div>
  )
}

export default ProductRequirementsButtons
