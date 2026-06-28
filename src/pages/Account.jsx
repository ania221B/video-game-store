import React from 'react'
import Wishlist from './Wishlist'
import { fetchWishlist } from '../api'
import Orders from './Orders'
import { useSelector } from 'react-redux'
import { Heart, ShoppingBag, UserRound } from 'lucide-react'
import background from '../assets/images/hero/page-hero-400.avif'
import { Link } from 'react-router-dom'

function Account () {
  const { user } = useSelector(state => state.auth)
  const email = user?.user_metadata?.email
    ? user.user_metadata.email
    : 'no email data'

  return (
    <section className='section account'>
      <div className='container' data-container='x-small'>
        <header className='account__header'>
          <div className='account__avatar'>
            <UserRound size={48}></UserRound>
          </div>
          <div className='flow'>
            <h1 className='fs-800'>Hello, gamer!</h1>
            <p className='fs-500'>{email}</p>
          </div>
        </header>

        <div className='padding-block-48'>
          <ul className='account__items grid-auto-fit'>
            <li>
              <Link to='/orders' className='account__item'>
                <picture className='bg-img'>
                  <img src={background} alt='' />
                </picture>
                <div className='main-content'>
                  <span>
                    <ShoppingBag size={36}></ShoppingBag>
                  </span>
                  <span className='fs-600'>Orders</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to='/wishlist' className='account__item'>
                <picture className='bg-img'>
                  <img src={background} alt='' />
                </picture>
                <div className='main-content'>
                  <span>
                    <Heart size={36}></Heart>
                  </span>
                  <span className='fs-600'>Wishlist</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Account
