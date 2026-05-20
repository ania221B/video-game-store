import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

function Pagination ({ data }) {
  const PAGE_SIZE = 20
  const { count, isNextPage, isPreviousPage } = data
  const { pathname, search } = useLocation()
  let page = Number(new URLSearchParams(search).get('page') ?? 1)
  const lastPage = Math.ceil(count / PAGE_SIZE)
  const pageSet = Math.floor((page - 1) / 5)
  const navigate = useNavigate()

  function handlePageChange (page) {
    const searchParams = new URLSearchParams(search)
    searchParams.set('page', page)
    navigate(`${pathname}?${searchParams.toString()}`)
  }

  function addPageButton ({ pageNumber, activeClass }) {
    return (
      <button
        type='button'
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`pagination__page btn btn--page ${
          activeClass ? 'active' : undefined
        }`}
        data-button='secondary'
      >
        {pageNumber}
      </button>
    )
  }

  function renderPageButtons (set, page) {
    if (!lastPage) return
    const allButtons = Array.from(
      { length: lastPage },
      (_, index) => index + 1
    ).reduce((groups, item) => {
      const lastGroup = groups[groups.length - 1]
      if (!lastGroup || lastGroup.length === 5) {
        groups.push([item])
      } else {
        lastGroup.push(item)
      }
      return groups
    }, [])

    const pageButtons = allButtons[set].map(item =>
      addPageButton({ pageNumber: item, activeClass: page === item })
    )

    return pageButtons
  }

  return (
    <div className='pagination'>
      {page > 1 && (
        <button
          type='button'
          onClick={() => {
            let previousPage = page - 1
            if (!isPreviousPage) previousPage = lastPage

            handlePageChange(previousPage)
          }}
          className='pagination__nav btn'
          data-button='page-nav'
        >
          <ChevronLeft></ChevronLeft>
          <span className='sr-only'>Previous page</span>
        </button>
      )}

      {renderPageButtons(pageSet, page)}

      {page < lastPage && (
        <button
          type='button'
          onClick={() => {
            let nextPage = page + 1
            if (!isNextPage) nextPage = 1

            handlePageChange(nextPage)
          }}
          className='pagination__nav btn'
          data-button='page-nav'
        >
          <ChevronRight></ChevronRight>
          <span className='sr-only'>Next page</span>
        </button>
      )}
    </div>
  )
}

export default Pagination
