import { CircleUserRound, LogOut, ShoppingCart } from 'lucide-react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { supabase } from '../../lib'

function Navigation () {
  const { cartItemsCount } = useSelector(store => store.cart)
  const { user } = useSelector(store => store.auth)
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
            <span className='primary-nav__extra'>
              <span className='cart-icon'>
                <span className='cart-icon__item-counter'>
                  {cartItemsCount}
                </span>
                <ShoppingCart className='extra__img' size={16}></ShoppingCart>
              </span>
              <span>Cart</span>
            </span>
          </NavLink>
        </li>
        {user ? (
          <>
            <li className='primary-nav__item'>
              <NavLink
                to='/account'
                aria-label='Go to your user account'
                className='primary-nav__link'
              >
                <div className='primary-nav__extra'>
                  <span>
                    <CircleUserRound
                      className='extra__img'
                      size={16}
                    ></CircleUserRound>
                  </span>
                  <span>Account</span>
                </div>
              </NavLink>
            </li>
            <li className='primary-nav__item'>
              <button
                type='button'
                aria-label='Log out from user account'
                className='primary-nav__link'
                data-button='nav-link'
                onClick={() => supabase.auth.signOut()}
              >
                <div className='primary-nav__extra'>
                  <span>
                    <LogOut className='extra__img' size={16}></LogOut>
                  </span>
                  <span>Logout</span>
                </div>
              </button>
            </li>
          </>
        ) : (
          <li className='primary-nav__item'>
            <NavLink to='/login' className='primary-nav__link'>
              <div className='primary-nav__extra'>
                <span>
                  <CircleUserRound
                    className='extra__img'
                    size={16}
                  ></CircleUserRound>
                </span>
                <span>Login</span>
              </div>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navigation
