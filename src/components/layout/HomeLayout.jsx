import { Link, Outlet } from 'react-router-dom'

function HomeLayout () {
  return (
    <>
      <header className='section'>
        <div className='container'>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/products'>Products</Link>
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
