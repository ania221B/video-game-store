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
      <header className='section'>
        <div className='container'>
          <nav>
            <ul>
              <li>
                <NavLink to='/'>Home</NavLink>
              </li>
              <li>
                <NavLink to='/products'>Products</NavLink>
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
