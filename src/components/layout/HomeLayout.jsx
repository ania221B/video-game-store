import { NavLink, Outlet } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { gamesApi } from '../../api'

export const loader = async function () {
  try {
    const { data: genresData } = await gamesApi.get('/genres')

    return { genresData }
  } catch (error) {
    console.log('genres loader error', error)
    throw error
  }
}

function HomeLayout () {
  const headerRef = useRef(null)
  const [headerHeight, setHeaderHeight] = useState(0)

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (headerRef.current) {
        const height = headerRef.current.getBoundingClientRect().height
        setHeaderHeight(height)
      }
    })

    if (headerRef.current) {
      resizeObserver.observe(headerRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [headerHeight])
  return (
    <>
      <header className='primary-header line-decoration' ref={headerRef}>
        <div className='container'>
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
            </ul>
          </nav>
        </div>
      </header>
      <main style={{ '--header-height': `${headerHeight}px` }}>
        <Outlet></Outlet>
      </main>
      <footer className='section'>
        <div className='container'>
          <h2>footer goes here</h2>
        </div>
      </footer>
    </>
  )
}

export default HomeLayout
