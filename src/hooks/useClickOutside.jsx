import { useEffect, useRef } from 'react'

function useClickOutside (ref, handler) {
  const handlerRef = useRef(handler)

  useEffect(() => {
    handlerRef.current = handler
  }, [handler])
  useEffect(() => {
    function listener (event) {
      if (!ref.current || ref.current.contains(event.target)) return
      handlerRef.current(event)
    }

    document.addEventListener('pointerdown', listener)

    return () => {
      document.removeEventListener('pointerdown', listener)
    }
  }, [ref])
}
export default useClickOutside
