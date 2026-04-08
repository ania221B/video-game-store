function ProductPlatforms ({
  platforms,
  selectedPlatform,
  setSelectedPlatform
}) {
  const handlePlatformChange = e => {
    const slug = e.target.value
    const name = platforms.find(item => item.platform.slug === slug).platform
      .name
    setSelectedPlatform({ slug, name })
  }

  return (
    <div className='product__platform-picker flow'>
      <p>Select the platform:</p>
      <div className='product__platform-options'>
        {platforms.map(item => {
          const { platform } = item
          return (
            <div key={platform.id}>
              <input
                id={platform.slug}
                type='radio'
                name='platform'
                value={platform.slug}
                checked={selectedPlatform.slug === platform.slug}
                onChange={handlePlatformChange}
              />
              <label htmlFor={platform.slug} className='badge'>
                {platform.name}
              </label>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProductPlatforms
