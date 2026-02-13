import { NavLink, Outlet } from 'react-router-dom'
import { gamesApi } from '../../api'

export const loader = async function () {
  const { data: genresData } = await gamesApi.get('/genres')
  const { data: platformsData } = await gamesApi.get('/platforms')

  return { genresData, platformsData }
}

function HomeLayout () {
  return (
    <>
      <header className='primary-header line-decoration'>
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
      <main>
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
