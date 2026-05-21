import { Outlet } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { genresQuery } from '../../api'
import Navigation from './Navigation'

export const loader = queryClient => async () => {
  await queryClient.ensureQueryData(genresQuery())
  return null
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
          <Navigation></Navigation>
        </div>
      </header>
      <main style={{ '--header-height': `${headerHeight}px` }}>
        <Outlet></Outlet>
      </main>
      <footer className='footer section'>
        <div className='container'>
          <h2>footer goes here</h2>
          <a
            href='https://rawg.io/apidocs'
            target='_blank'
            rel='noopener noreferrer'
          >
            Built with RAWG API
          </a>
          <a
            href='https://storyset.com/web'
            target='_blank'
            rel='noopener noreferrer'
          >
            Web illustrations by Storyset
          </a>
        </div>
      </footer>
    </>
  )
}

export default HomeLayout
