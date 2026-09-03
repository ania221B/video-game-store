import { X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal, hideModal } from './modalSlice'
import { useLayoutEffect, useRef } from 'react'
import { useClickOutside } from '../../hooks'

function Modal ({ children }) {
  const dispatch = useDispatch()
  const { modalState } = useSelector(state => state.modal)
  const modalRef = useRef(null)
  const modalContentRef = useRef(null)

  function closeDialog () {
    dispatch(hideModal())
  }

  function handleKeyboard (e) {
    if (e.key === 'Escape') {
      e.preventDefault()
      dispatch(hideModal())
    }
  }

  useLayoutEffect(() => {
    if (modalRef.current == null) return
    const modalElement = modalRef.current

    function handleAnimationEnd (e) {
      if (e.animationName === 'hideDialog') {
        dispatch(closeModal())
        modalElement.close()
      }
    }

    if (modalState === 'OPEN' && !modalElement.open) {
      modalElement.showModal()
    }

    if (modalState === 'IS-CLOSING') {
      modalElement.addEventListener('animationend', handleAnimationEnd)

      return () => {
        modalElement.removeEventListener('animationend', handleAnimationEnd)
      }
    }
  }, [modalState, modalRef])

  useClickOutside(modalContentRef, closeDialog)

  return (
    <>
      {createPortal(
        <dialog
          ref={modalRef}
          className='modal'
          data-state={modalState}
          onKeyDown={handleKeyboard}
        >
          <div ref={modalContentRef} className='modal__content'>
            <button
              type='button'
              className='btn'
              aria-label='close lightbox'
              onClick={closeDialog}
              data-button='primary'
            >
              <span>
                <X size={20}></X>
              </span>
              <span>
                <X size={20}></X>
              </span>
            </button>
            {children}
          </div>
        </dialog>,
        document.body.querySelector('#modal-container')
      )}
    </>
  )
}

export default Modal
