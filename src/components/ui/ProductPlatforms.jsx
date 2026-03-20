import { useState } from 'react'

function ProductPlatforms ({ platforms }) {
  const [selectedPlatform, setSelectedPlatform] = useState('')

  const handlePlatformChange = e => {
    setSelectedPlatform(e.target.value)
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
                checked={selectedPlatform === platform.slug}
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
