import { ChevronDown } from 'lucide-react'
import { nanoid } from 'nanoid'
import { useRef, useState } from 'react'
import { useNavigation, useSearchParams } from 'react-router-dom'
import { useClickOutside } from '../../hooks'
import { checkIndex } from '../../utils'

const sortingOptions = [
  {
    id: 'name',
    name: 'name',
    value: 'name'
  },
  {
    id: 'popularity',
    name: 'popularity',
    value: '-rating'
  },
  {
    id: 'release-date',
    name: 'release date',
    value: '-released'
  }
]

function CustomSelect () {
  const navigation = useNavigation()
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedOrder = searchParams.get('ordering')
    ? searchParams.get('ordering')
    : ''
  const [dropdownState, setDropdownState] = useState('CLOSED')
  const isDropdownOpen = dropdownState === 'OPEN'
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const dropdownContainerRef = useRef(null)

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
    setDropdownState(prev => (prev === 'OPEN' ? 'IS-CLOSING' : 'OPEN'))
    setHighlightedIndex(currentIndex)
  }

  function handleKeyDown (e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      isDropdownOpen
        ? setHighlightedIndex(prevIndex =>
            checkIndex(prevIndex + 1, sortingOptions)
          )
        : setDropdownState('OPEN')
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
      if (dropdownState === 'OPEN' && sortingOptions[highlightedIndex]) {
        const highlightedValue = sortingOptions[highlightedIndex].value

        handleSelection(highlightedValue)
        setDropdownState('IS-CLOSING')
      } else {
        setDropdownState('OPEN')
        setHighlightedIndex(currentIndex)
      }
    }
    if (e.key === 'Escape') {
      setDropdownState('IS-CLOSING')
    }
  }

  useClickOutside(dropdownContainerRef, () => {
    if (dropdownState === 'OPEN') {
      setDropdownState('IS-CLOSING')
    }
  })

  function handleAnimationEnd (e) {
    if (e.animationName === 'closeDropdown') {
      setDropdownState('CLOSED')
    }
  }

  return (
    <div
      className='custom-select'
      data-state={dropdownState === 'OPEN' ? 'OPEN' : dropdownState}
      ref={dropdownContainerRef}
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
          {navigation.state === 'loading' ? 'updating...' : customSelectLabel}
        </span>

        <ChevronDown></ChevronDown>
      </button>

      {dropdownState !== 'CLOSED' && (
        <ul
          id='sorting-list'
          aria-label='pick a filter to sort games list'
          className='custom-select__dropdown'
          role='listbox'
          data-state={dropdownState === 'OPEN' ? 'OPEN' : dropdownState}
          onAnimationEnd={handleAnimationEnd}
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
                  setDropdownState('IS-CLOSING')
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
