import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

function LightboxCarousel ({ slideList, currentSlide }) {
  const [imageIndex, setImageIndex] = useState(currentSlide ?? 0)
  const selectedImage = slideList[imageIndex]?.image
  const buttonRefs = useRef([])

  function checkIndex (index) {
    if (index < 0) {
      return slideList.length - 1
    }
    if (index > slideList.length - 1) {
      return 0
    }

    return index
  }

  function displayPreviousSlide () {
    setImageIndex(displayedSlide => checkIndex(displayedSlide - 1))
  }
  function displayNextSlide () {
    setImageIndex(displayedSlide => checkIndex(displayedSlide + 1))
  }

  useEffect(() => {
    const button = buttonRefs.current[imageIndex]
    button?.focus()
  }, [imageIndex])

  return (
    <div
      className='lightbox-carousel'
      role='region'
      aria-label='Image gallery'
      aria-live='polite'
    >
      <button
        type='button'
        className='lightbox-carousel__btn btn'
        aria-label={`Display previous slide, currently showing ${
          imageIndex + 1
        } of ${slideList.length}`}
        onClick={displayPreviousSlide}
      >
        <ArrowLeft></ArrowLeft>
      </button>
      <div className='lightbox-carousel__preview'>
        <img
          src={selectedImage}
          alt={`Screenshot ${imageIndex + 1} of ${slideList.length}`}
        />
      </div>
      <button
        type='button'
        className='lightbox-carousel__btn btn'
        aria-label={`Display next slide, currently showing ${
          imageIndex + 1
        } of ${slideList.length}`}
        onClick={displayNextSlide}
      >
        <ArrowRight></ArrowRight>
      </button>
      <ul className='lightbox-carousel__list' role='list'>
        {slideList.map((slide, index) => {
          return (
            <li key={slide.id}>
              <button
                type='button'
                aria-label={`View screenshot ${index + 1}`}
                aria-current={index === imageIndex ? 'true' : undefined}
                className='btn'
                onClick={() => setImageIndex(index)}
                ref={item => (buttonRefs.current[index] = item)}
              >
                <img src={slide.image} alt='' loading='lazy' />
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default LightboxCarousel
