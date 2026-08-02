import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'
import NotFound from '../assets/images/error/page-not-found.svg?react'
import ErrorImg from '../assets/images/error/error.svg?react'

function Error () {
  const error = useRouteError()

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <section className='section error-page error-page--not-found'>
        <div className='container'>
          <div className='img-container error-page__img'>
            <NotFound></NotFound>
          </div>
          <div className='error-page__text-content flow text-center'>
            <h2 className='error-page__title'>Error!</h2>
            <p className='fs-500'>
              Seems you've lost your way. This page does not exist.
            </p>
            <Link to='/' className='btn' data-button='primary'>
              <span>Back Home</span>
              <span aria-hidden='true'>Back Home</span>
            </Link>
          </div>
        </div>
      </section>
    )
  }
  if (
    !error?.response ||
    error?.response?.status >= 500 ||
    error?.message === 'Network Error'
  ) {
    return (
      <section className='section error-page error-page--not-found'>
        <div className='container'>
          <div className='img-container error-page__img'>
            <ErrorImg></ErrorImg>
          </div>
          <div className='error-page__text-content flow text-center'>
            <h2 className='error-page__title'>Error!</h2>
            <p className='fs-500'>
              We're having trouble connecting to our games database, please try
              again later.
            </p>
            <button
              type='button'
              className='btn'
              data-button='primary'
              onClick={() => window.location.reload()}
            >
              <span>Try again</span>
              <span aria-hidden='true'>Try again</span>
            </button>
          </div>
        </div>
      </section>
    )
  }
  return (
    <section className='section error-page error-page--general'>
      <div className='container'>
        <div className='img-container error-page__img'>
          <ErrorImg></ErrorImg>
        </div>
        <div className=' error-page__text-content flow text-center'>
          <h2 className='error-page__title'>Something went wrong...</h2>

          <Link to='/' className='btn' data-button='primary'>
            <span>Back Home</span>
            <span aria-hidden='true'>Back Home</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Error
