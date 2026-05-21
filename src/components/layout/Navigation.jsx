import { ShoppingCart } from 'lucide-react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

function Navigation () {
  const { cartItemsCount } = useSelector(store => store.cart)
  return (
    <nav className='primary-nav'>
      <ul className='primary-nav__list'>
        <li className='primary-nav__item'>
          <NavLink to='/' className='primary-nav__link'>
            Home
          </NavLink>
        </li>
        <li className='primary-nav__item'>
          <NavLink to='/products' className='primary-nav__link'>
            Products
          </NavLink>
        </li>
        {/* CART LINK */}
        <li className='primary-nav__item'>
          <NavLink to='/cart' className='primary-nav__link'>
            <span className='cart-icon'>
              <span className='cart-icon__item-counter'>{cartItemsCount}</span>
              <ShoppingCart className='cart-icon__img'></ShoppingCart>
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
