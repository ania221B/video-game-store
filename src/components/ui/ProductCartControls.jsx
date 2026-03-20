import { Minus, Plus } from 'lucide-react'

function ProductCartControls () {
  return (
    <div className='product__cart-controls cart-controls'>
      <div className='quantity-form-control'>
        <button
          type='button'
          className='btn'
          data-button='primary'
          aria-label='Decrease product quantity in cart'
        >
          <span aria-hidden='true'>
            <Minus></Minus>
          </span>
          <span aria-hidden='true'>
            <Minus></Minus>
          </span>
        </button>
        <input
          type='number'
          name='product-quantity'
          id='product-quantity'
          min='0'
          max='100'
          value='1'
          onChange={e => {
            const value = Number(e.target.value)
            if (!isNaN(value)) onChange(value)
          }}
          // disabled={isDisabled}
        />
        <label htmlFor='product-quantity' className='sr-only'>
          Product count
        </label>
        <button
          type='button'
          className='btn'
          data-button='primary'
          aria-label='Increase product quantity in cart'
        >
          <span aria-hidden='true'>
            <Plus></Plus>
          </span>
          <span aria-hidden='true'>
            <Plus></Plus>
          </span>
        </button>
      </div>
      <button type='button' className='btn' data-button='primary'>
        <span>Add to cart</span>
        <span aria-hidden='true'>Add to cart</span>
      </button>
    </div>
  )
}

export default ProductCartControls
