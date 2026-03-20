import ProductCartControls from './ProductCartControls'
import ProductPlatforms from './ProductPlatforms'

function ProductCart ({ platforms }) {
  return (
    <section className='product__cart'>
      {/* PRICE */}
      <dl className={'product__price'}>
        <dt className='sr-only'>Price:</dt>
        <dd>
          <span className='sr-only'>Price is $0.00.</span>
          <span className='fs-900 fw-extra-bold' aria-hidden='true'>
            $0.00
          </span>
        </dd>
      </dl>
      {/* PLATFORMS */}
      <ProductPlatforms platforms={platforms}></ProductPlatforms>
      {/* CART CONTROLS */}
      <ProductCartControls></ProductCartControls>
    </section>
  )
}

export default ProductCart
