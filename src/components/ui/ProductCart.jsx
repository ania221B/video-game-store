import ProductCartControls from './ProductCartControls'
import ProductPlatforms from './ProductPlatforms'

function ProductCart ({
  platforms,
  price,
  selectedPlatform,
  setSelectedPlatform,
  quantity,
  onChange,
  onDecrease,
  onIncrease,
  addToCart
}) {
  return (
    <section className='product__cart'>
      {/* PRICE */}
      <dl className={'product__price'}>
        <dt className='sr-only'>Price:</dt>
        <dd>
          <span className='sr-only'>Price is ${price}.</span>
          <span className='fs-900 fw-extra-bold' aria-hidden='true'>
            ${price}
          </span>
        </dd>
      </dl>
      {/* PLATFORMS */}
      <ProductPlatforms
        platforms={platforms}
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
      ></ProductPlatforms>
      {/* CART CONTROLS */}
      <ProductCartControls
        quantity={quantity}
        onChange={onChange}
        onDecrease={onDecrease}
        onIncrease={onIncrease}
        addToCart={addToCart}
      ></ProductCartControls>
    </section>
  )
}

export default ProductCart
