import { useDispatch } from 'react-redux'
import { openModal } from '../../features/modal/modalSlice'

function ProductGallery ({ gameName, gameScreenshots }) {
  const dispatch = useDispatch()
  return (
    <section className='product__gallery'>
      <h2 className='product__title fs-700'>Gallery</h2>
      <ul className='grid-auto-fit' style={{ marginBlockStart: '1.5rem' }}>
        {gameScreenshots.map((screenshot, index) => {
          return (
            <li key={screenshot.id}>
              <button
                type='button'
                className='btn'
                onClick={() =>
                  dispatch(openModal({ list: gameScreenshots, index: index }))
                }
              >
                <img
                  src={screenshot.image}
                  alt={`image from ${gameName}`}
                  loading='lazy'
                ></img>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default ProductGallery
