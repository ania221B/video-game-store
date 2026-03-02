import { ArrowLeft, ArrowRight } from 'lucide-react'
import { nanoid } from 'nanoid'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

function Carousel ({ slideList }) {
  const VISIBLE_SLIDES = 5
  const TRANSITION_DURATION = 700
  const [slideIndex, setSlideIndex] = useState(VISIBLE_SLIDES)
  const [slideWidth, setSlideWidth] = useState(0)
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(false)
  const slideRef = useRef(null)

  function makeArrayWithClones (array) {
    const clonesBefore = array.slice(-VISIBLE_SLIDES).map(slide => ({
      ...slide,
      renderId: nanoid(),
      isClone: true
    }))
    const originals = array.map(slide => ({
      ...slide,
      renderId: slide.id,
      isClone: false
    }))
    const clonesAfter = array.slice(0, VISIBLE_SLIDES).map(slide => ({
      ...slide,
      renderId: nanoid(),
      isClone: true
    }))

    return [...clonesBefore, ...originals, ...clonesAfter]
  }

  const slidesWithClones = useMemo(
    () => makeArrayWithClones(slideList),
    [slideList, VISIBLE_SLIDES]
  )

  function handleTransition (index) {
    let jumped = false
    if (index === VISIBLE_SLIDES - 1) {
      setIsTransitionEnabled(false)
      setSlideIndex(slidesWithClones.length - VISIBLE_SLIDES - 1)
      jumped = true
    }

    if (index === slidesWithClones.length - VISIBLE_SLIDES) {
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
    setSlideIndex(displayedSlide => {
      const newIndex = displayedSlide - 1
      return newIndex
    })
  }

  function displayNextSlide () {
    setSlideIndex(displayedSlide => {
      const newIndex = displayedSlide + 1
      return newIndex
    })
  }

  function handleKyeboard (event) {
    if (event.key === 'ArrowLeft') {
      displayPreviousSlide()
    } else if (event.key === 'ArrowRight') {
      displayNextSlide()
    }
  }

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (slideRef.current) {
        const width = slideRef.current.getBoundingClientRect().width
        setSlideWidth(width)
      }
    })

    if (slideRef.current) {
      resizeObserver.observe(slideRef.current)
    }

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
    window.addEventListener('keydown', handleKyeboard)

    return () => {
      window.removeEventListener('keydown', handleKyeboard)
    }
  }, [])

  if (slideList.length === 0) return null

  return (
    <div
      className='carousel'
      aria-roledescription='carousel'
      aria-label='all game genres'
    >
      <button
        type='button'
        aria-controls='slides-list'
        aria-label='display previous slide'
        className='carousel__btn btn'
        data-button='carousel-control'
        onClick={displayPreviousSlide}
      >
        <ArrowLeft></ArrowLeft>
      </button>

      <div className='carousel__content'>
        <ul
          id='slides-list'
          className='carousel__slides'
          aria-live='polite'
          style={{
            transition: `${
              isTransitionEnabled
                ? `transform ${TRANSITION_DURATION}ms ease-in-out`
                : 'none'
            }`,
            transform: `translateX(-${slideWidth * slideIndex}px)`
          }}
          onTransitionEnd={() => handleTransition(slideIndex)}
        >
          {slidesWithClones.map((genre, index) => {
            const {
              id,
              name,
              slug,
              games_count,
              image_background,
              renderId,
              isClone
            } = genre
            return (
              <li
                ref={index === VISIBLE_SLIDES ? slideRef : null}
                key={renderId}
                className={`${
                  isClone ? 'carousel__slide clone' : 'carousel__slide'
                }`}
                style={{ left: `${slideWidth * index}px` }}
                data-selected={index === slideIndex ? 'selected' : undefined}
                aria-roledescription='slide'
                aria-label={`${index + 1} of ${slideList.length}`}
              >
                <article className='card'>
                  <div className='card__img'>
                    <img src={image_background} alt={name} />
                  </div>
                  <header>
                    <h2>
                      <Link to={`/genres/${slug}`}>{name}</Link>
                    </h2>
                    <p>games: {games_count}</p>
                  </header>
                </article>
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
    </div>
  )
}

export default Carousel
