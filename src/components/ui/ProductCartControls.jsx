import { QuantityControls } from '../common'

function ProductCartControls ({
  quantity,
  onChange,
  onDecrease,
  onIncrease,
  addToCart
}) {
  return (
    <div className='product__cart-controls cart-controls'>
      <QuantityControls
        quantity={quantity}
        onChange={onChange}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      ></QuantityControls>
      <button
        type='button'
        className='btn'
        data-button='primary'
        onClick={addToCart}
      >
        <span>Add to cart</span>
        <span aria-hidden='true'>Add to cart</span>
      </button>
    </div>
  )
}

export default ProductCartControls
