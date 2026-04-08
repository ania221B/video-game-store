import { Minus, Plus } from 'lucide-react'

function QuantityControls ({
  quantity,
  onIncrease,
  onDecrease,
  onChange,
  min = 0,
  max = 100
}) {
  return (
    <div className='quantity-form-control'>
      <button
        type='button'
        className='btn'
        data-button='primary'
        aria-label='Decrease product quantity in cart'
        onClick={onDecrease}
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
        min={min}
        max={max}
        value={quantity === '' ? '' : quantity}
        onChange={e => {
          const inputValue = e.target.value

          if (inputValue === '') {
            onChange('')
            return
          }
          const value = Number(inputValue)
          if (!isNaN(value)) onChange(value)
        }}
      />
      <label htmlFor='product-quantity' className='sr-only'>
        Product count
      </label>
      <button
        type='button'
        className='btn'
        data-button='primary'
        aria-label='Increase product quantity in cart'
        onClick={onIncrease}
      >
        <span aria-hidden='true'>
          <Plus></Plus>
        </span>
        <span aria-hidden='true'>
          <Plus></Plus>
        </span>
      </button>
    </div>
  )
}

export default QuantityControls
