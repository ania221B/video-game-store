import { Link } from 'react-router-dom'
import ErrorImg from '../../assets/images/error/error.svg?react'
function ProductsError () {
  return (
    <section className='section error-page error-page--not-found'>
      <div className='container'>
        <div className='img-container error-page__img'>
          <ErrorImg></ErrorImg>
        </div>
        <div className='error-page__text-content flow text-center'>
          <h2 className='error-page__title'>Error!</h2>
          <p className='fs-500'>Something went wrong loading games.</p>
          <Link to='/' className='btn' data-button='primary'>
            <span>Back Home</span>
            <span aria-hidden='true'>Back Home</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProductsError
