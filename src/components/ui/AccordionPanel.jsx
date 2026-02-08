import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

function AccordionPanel ({ title, list }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedFilters =
    searchParams.get(`${title}`) && searchParams.get(`${title}`) !== ''
      ? searchParams.get(`${title}`)?.split(',')
      : []

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
  return (
    <div className='accordion__panel'>
      <h3 className='accordion__title'>
        <button type='button' className='btn'>
          <span>{title}</span>
          <ChevronDown></ChevronDown>
        </button>
      </h3>

      <div className='accordion__content' id={`accordion__content-${title}`}>
        <div>
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
  )
}

export default AccordionPanel
