import { ChevronDown } from 'lucide-react'
import { nanoid } from 'nanoid'
import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useClickOutside } from '../../hooks'
import { checkIndex } from '../../utils'

function CustomSelect () {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedOrder = searchParams.get('ordering')
    ? searchParams.get('ordering')
    : ''
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const dropDownContainerRef = useRef(null)
  const sortingOptions = [
    {
      id: nanoid(),
      name: 'name',
      value: 'name'
    },
    {
      id: nanoid(),
      name: 'popularity',
      value: '-rating'
    },
    {
      id: nanoid(),
      name: 'release date',
      value: '-released'
    }
  ]

  const selectedOption = sortingOptions.find(
    option => option.value === selectedOrder
  )
  const customSelectLabel = selectedOption
    ? selectedOption.name
    : sortingOptions[0].name

  function handleSelection (value) {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('ordering', value)
    setSearchParams(newSearchParams)
  }

  function toggleDropdown () {
    const index = sortingOptions.findIndex(
      option => option.value === selectedOrder
    )
    const currentIndex = index !== -1 ? index : 0
    setIsDropdownOpen(!isDropdownOpen)
    setHighlightedIndex(currentIndex)
  }

  function handleKeyDown (e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      isDropdownOpen
        ? setHighlightedIndex(prevIndex =>
            checkIndex(prevIndex + 1, sortingOptions)
          )
        : setIsDropdownOpen(true)
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex(prevIndex =>
        checkIndex(prevIndex - 1, sortingOptions)
      )
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      const index = sortingOptions.findIndex(
        option => option.value === selectedOrder
      )
      const currentIndex = index !== -1 ? index : 0
      if (isDropdownOpen && sortingOptions[highlightedIndex]) {
        const highlightedValue = sortingOptions[highlightedIndex].value

        handleSelection(highlightedValue)
        setIsDropdownOpen(false)
      } else {
        setIsDropdownOpen(true)
        setHighlightedIndex(currentIndex)
      }
    }
    if (e.key === 'Escape') {
      setIsDropdownOpen(false)
    }
  }

  useClickOutside(dropDownContainerRef, () => {
    setIsDropdownOpen(false)
  })

  return (
    <div
      className='custom-select'
      data-state={isDropdownOpen ? 'open' : 'closed'}
      ref={dropDownContainerRef}      
    >
      <button
        type='button'
        role='combobox'
        aria-expanded={isDropdownOpen}
        aria-haspopup='listbox'
        aria-controls='sorting-list'
        aria-activedescendant={
          isDropdownOpen ? `option-${highlightedIndex}` : undefined
        }
        className='btn custom-select__btn filter-menu__btn'
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        data-button='secondary'
      >
        <span className='custom-select__selected-value'>
          {' '}
          {customSelectLabel}
        </span>

        <ChevronDown></ChevronDown>
      </button>
      {isDropdownOpen && (
        <ul
          id='sorting-list'
          aria-label='pick a filter to sort games list'
          className='custom-select__dropdown'
          role='listbox'
          data-state={isDropdownOpen}
          style={{ display: 'grid', gridAutoFlow: 'columns' }}
        >
          {sortingOptions.map((option, index) => {
            return (
              <li
                key={option.id}
                id={`option-${index}`}
                role='option'
                aria-selected={option.value === selectedOrder || undefined}
                onClick={() => {
                  handleSelection(option.value)
                  setIsDropdownOpen(false)
                }}
                className={`custom-select__toggle btn ${
                  highlightedIndex === index ? ' highlighted' : ''
                } ${selectedOrder === option.value ? 'selected' : ''}`}
              >
                {option.name}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default CustomSelect
