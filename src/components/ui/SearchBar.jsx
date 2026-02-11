import { useSearchParams } from 'react-router-dom'

function SearchBar () {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentSearchTerm = searchParams.get('search')
    ? searchParams.get('search')
    : ''

  function handleInput (searchedText) {
    const newSearchParams = new URLSearchParams(searchParams)

    if (searchedText) {
      newSearchParams.set('search', searchedText)
    } else {
      newSearchParams.delete('search')
    }
    setSearchParams(newSearchParams)
  }


  return (
    <search onSubmit={e => e.preventDefault()} className='search-menu'>
      <form className='search-form'>
        <div className='form__wrapper'>
          <label htmlFor='search-input'>Search for games</label>
          <input
            type='text'
            id='search-input'
            name='search'
            defaultValue={currentSearchTerm}
            placeholder='Search a game e.g. Hollow Knight'
            onChange={e => handleInput(e.target.value)}
          />
        <button type='submit' className='btn' data-button='primary'>
            <span>submit</span>
            <span>submit</span>
        </button>
        </div>
      </form>
    </search>
  )
}

export default SearchBar
