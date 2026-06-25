import React from 'react'
import Wishlist from './Wishlist'
import { fetchWishlist } from '../api'

function Account () {
  return (
    <section className='section'>
      <div className='container'>
        <Wishlist></Wishlist>
      </div>
    </section>
  )
}

export default Account
