import { useState } from 'react'
import ProductRequirementsButtons from './ProductRequirementsButtons'
import ProductRequirementsPanels from './ProductRequirementsPanels'

function ProductRequirements ({ platformList }) {
  const [platforms, setPlatforms] = useState(platformList)
  const [currentPlatformIndex, setCurrentPlatformIndex] = useState(0)
  return (
    <section className='product__requirements flow'>
      <h2 className='product__title fs-700'>System requirements</h2>
      <ProductRequirementsButtons
        platformList={platforms}
        currentPlatformIndex={currentPlatformIndex}
        setCurrentPlatformIndex={setCurrentPlatformIndex}
      ></ProductRequirementsButtons>

      <ProductRequirementsPanels
        platforms={platforms}
        currentPlatformIndex={currentPlatformIndex}
      ></ProductRequirementsPanels>
    </section>
  )
}

export default ProductRequirements
