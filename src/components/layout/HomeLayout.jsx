import { Outlet } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { genresQuery } from '../../api'
import Header from './Header'
import Footer from './Footer'

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
      <Header headerRef={headerRef}></Header>
      <main style={{ '--header-height': `${headerHeight}px` }}>
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </>
  )
}

export default HomeLayout
