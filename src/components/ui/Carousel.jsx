import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import Card from './Card'

function Carousel ({ slideList, label, type = 'games', route = 'products' }) {
  const VISIBLE_SLIDES = type === 'hero' ? 1 : 5
  const TRANSITION_DURATION = 700
  const [slideIndex, setSlideIndex] = useState(VISIBLE_SLIDES)
  const [slideWidth, setSlideWidth] = useState(0)
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const carouselRef = useRef(null)
  const slideRefs = useRef([])
  const buttonRef = useRef(null)

  function makeArrayWithClones (array) {
    const clonesBefore = array.slice(-VISIBLE_SLIDES).map((slide, index) => ({
      ...slide,
      renderId: `${slide.id}-clone-${index}`,
      isClone: true
    }))
    const originals = array.map(slide => ({
      ...slide,
      renderId: slide.id,
      isClone: false
    }))
    const clonesAfter = array.slice(0, VISIBLE_SLIDES).map((slide, index) => ({
      ...slide,
      renderId: `${slide.id}-clone-${index}`,
      isClone: true
    }))

    const slidesWithClones = [...clonesBefore, ...originals, ...clonesAfter]

    return { slidesWithClones, originals }
  }

  const { slidesWithClones, originals } = useMemo(
    () => makeArrayWithClones(slideList),
    [slideList]
  )

  function handleTransition (index) {
    setIsAnimating(false)
    let jumped = false
    if (index < VISIBLE_SLIDES) {
      setIsTransitionEnabled(false)
      setSlideIndex(slidesWithClones.length - VISIBLE_SLIDES - 1)
      jumped = true
    }

    if (index > slidesWithClones.length - VISIBLE_SLIDES - 1) {
      setIsTransitionEnabled(false)
      setSlideIndex(VISIBLE_SLIDES)
      jumped = true
    }

    if (jumped) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsTransitionEnabled(true))
      })
    }
  }

  function displayPreviousSlide () {
    if (isAnimating) return
    setIsAnimating(true)
    setSlideIndex(displayedSlide => {
      const newIndex = displayedSlide - 1
      return newIndex
    })
  }

  function displayNextSlide () {
    if (isAnimating) return
    setIsAnimating(true)
    setSlideIndex(displayedSlide => {
      const newIndex = displayedSlide + 1
      return newIndex
    })
  }

  function displaySelectedSlide (index) {
    setSlideIndex(index)
  }

  function handleKeyboard (event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      displayPreviousSlide()
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      displayNextSlide()
    }

    if (event.key === 'Home') {
      event.preventDefault()
      displaySelectedSlide(VISIBLE_SLIDES)
    }

    if (event.key === 'End') {
      event.preventDefault()
      displaySelectedSlide(slidesWithClones.length - VISIBLE_SLIDES - 1)
    }
  }

  useEffect(() => {
    const slide = slideRefs.current[0]
    if (!slide) return

    const resizeObserver = new ResizeObserver(entires => {
      const width = entires[0].contentRect.width
      setSlideWidth(width)
    })

    resizeObserver.observe(slide)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    if (slideWidth > 0) {
      setIsTransitionEnabled(true)
    }
  }, [slideWidth])

  useEffect(() => {
    const slide = slideRefs.current[slideIndex]
    const link = slide?.querySelector('a')
    if (!slidesWithClones[slideIndex]?.isClone) {
      link?.focus({ preventScroll: true })
    }
  }, [slideIndex])

  if (slideList.length === 0) return null

  return (
    <div
      className='carousel'
      tabIndex='0'
      aria-roledescription='carousel'
      aria-labelledby={label}
      data-type={type === 'hero' ? 'hero' : null}
      ref={carouselRef}
      onKeyDown={handleKeyboard}
      role='group'
    >
      <button
        type='button'
        aria-controls='slides-list'
        aria-label='display previous slide'
        className='carousel__btn btn'
        data-button='carousel-control'
        onClick={displayPreviousSlide}
        ref={buttonRef}
      >
        <ArrowLeft></ArrowLeft>
      </button>

      <div
        className='carousel__content'
        style={{
          '--button-width': `${
            buttonRef?.current?.getBoundingClientRect()?.width
          }px`
        }}
      >
        <ul
          id='slides-list'
          className='carousel__slides'
          style={{
            transition: `${
              isTransitionEnabled
                ? `transform ${TRANSITION_DURATION}ms ease-in-out`
                : 'none'
            }`,
            transform: `translateX(-${slideIndex * 100}%)`
          }}
          onTransitionEnd={e => {
            if (e.propertyName === 'transform') {
              handleTransition(slideIndex)
            }
          }}
        >
          {slidesWithClones.map((item, index) => {
            return (
              <li
                ref={item => (slideRefs.current[index] = item)}
                key={item.renderId}
                id={item.renderId}
                className={`${
                  item.isClone ? 'carousel__slide clone' : 'carousel__slide'
                }`}
                style={{ left: `${slideWidth * index}px` }}
                data-selected={index === slideIndex ? 'selected' : undefined}
                aria-labelledby={`game-label-${item.renderId}`}
                aria-roledescription={type !== 'hero' ? 'slide' : null}
                role={type === 'hero' ? 'tabpanel' : 'group'}
                tabIndex='-1'
              >
                {type === 'games' || type === 'hero' ? (
                  <Card
                    item={item}
                    type={type}
                    tabIndex={!item.isClone && index === slideIndex ? 0 : -1}
                  ></Card>
                ) : (
                  <Card
                    item={item}
                    route={route}
                    type={type}
                    tabIndex={!item.isClone && index === slideIndex ? 0 : -1}
                  ></Card>
                )}
              </li>
            )
          })}
        </ul>
      </div>

      <button
        type='button'
        aria-controls='slides-list'
        aria-label='display next slide'
        className='carousel__btn btn'
        data-button='carousel-control'
        onClick={displayNextSlide}
      >
        <ArrowRight></ArrowRight>
      </button>

      {type === 'hero' ? (
        <div
          className='carousel__indicators'
          role='tablist'
          aria-label='Choose slide to display'
        >
          {originals.map((slide, index) => {
            return (
              <button
                key={slide.renderId}
                type='button'
                className={
                  index === slideIndex - VISIBLE_SLIDES
                    ? `carousel__indicator btn is-selected`
                    : `carousel__indicator btn`
                }
                onClick={() => displaySelectedSlide(index + VISIBLE_SLIDES)}
                aria-controls={slide.renderId}
                aria-label={`Go to slide ${index + 1}`}
                aria-selected={
                  index === slideIndex - VISIBLE_SLIDES ? true : false
                }
                role='tab'
              ></button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export default Carousel
