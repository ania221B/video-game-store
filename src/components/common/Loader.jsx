import { LoaderCircle } from 'lucide-react'

function Loader () {
  return (
    <div className='spinner-section'>
      <div className='spinner-container'>
        <LoaderCircle className='spinner'></LoaderCircle>
        <p className='sr-only'>Loading...</p>
      </div>
    </div>
  )
}

export default Loader
