import { ChevronDown } from 'lucide-react'
import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

function AccordionPanel ({ title, list }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedFilters =
    searchParams.get(`${title}`) && searchParams.get(`${title}`) !== ''
      ? searchParams.get(`${title}`)?.split(',')
      : []
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const panelRef = useRef(null)

  function handleChange (e) {
    const newSearchParams = new URLSearchParams(searchParams)
    const filterList =
      newSearchParams.get(`${title}`) && searchParams.get(`${title}`) !== ''
        ? newSearchParams.get(`${title}`).split(',')
        : []

    let newFilterList
    if (e.target.checked) {
      newFilterList = [...new Set([...filterList, e.target.name])]
    } else {
      newFilterList = filterList.filter(genre => genre !== e.target.name)
    }

    if (newFilterList.length > 0) {
      newSearchParams.set(`${title}`, newFilterList.join(','))
    } else {
      newSearchParams.delete(`${title}`)
    }

    setSearchParams(newSearchParams)
  }

  function togglePanel () {
    const panel = panelRef.current
    if (!panel) return

    const scrollHeight = panel.scrollHeight
    panel.style.setProperty(
      '--accordion-max-height',
      isPanelOpen ? '0px' : `${scrollHeight}px`
    )
    setIsPanelOpen(!isPanelOpen)
  }

  return (
    <div
      className='accordion__panel'
      data-state={isPanelOpen ? 'opened' : 'closed'}
    >
      <h3 className='accordion__title'>
        <button
          type='button'
          aria-label={`Show or hide 
            ${title} filter`}
          aria-controls={`accordion__content-${title}`}
          aria-expanded={isPanelOpen}
          className='btn accordion__btn filter-menu__btn'
          onClick={togglePanel}
          data-button='secondary'
        >
          <span>{title}</span>
          <ChevronDown className='accordion__toggle'></ChevronDown>
        </button>
      </h3>

      <div
        ref={panelRef}
        className='accordion__content'
        id={`accordion__content-${title}`}
        aria-hidden={isPanelOpen ? false : true}
        inert={!isPanelOpen}
      >
        <div>
          <div className='accordion__inner-content product-filters'>
            {list?.map(item => {
              const { id, name, slug } = item
              return (
                <div className='product-filters__control-wrapper' key={id}>
                  <input
                    type='checkbox'
                    id={name}
                    name={title === 'platforms' ? id : slug}
                    checked={selectedFilters.includes(
                      title === 'platforms' ? id.toString() : slug
                    )}
                    onChange={handleChange}
                  />
                  <label htmlFor={name}>{name}</label>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccordionPanel
