import { Outlet } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { genresQuery } from '../../api'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import SkipToMain from './SkipToMain'
import { Modal } from '../../features'
import LightboxCarousel from '../ui/LightboxCarousel'
import { useSelector } from 'react-redux'

export const loader = queryClient => async () => {
  await queryClient.ensureQueryData(genresQuery())
  return null
}

function HomeLayout () {
  const headerRef = useRef(null)
  const [headerHeight, setHeaderHeight] = useState(0)
  const { content } = useSelector(state => state.modal)

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
      <SkipToMain></SkipToMain>
      <ScrollToTop></ScrollToTop>
      <Header headerRef={headerRef}></Header>
      <main
        id='main-content'
        style={{ '--header-height': `${headerHeight}px` }}
      >
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
      {content && (
        <Modal>
          <LightboxCarousel
            slideList={content.list}
            currentSlide={content.index}
          ></LightboxCarousel>
        </Modal>
      )}
    </>
  )
}

export default HomeLayout
