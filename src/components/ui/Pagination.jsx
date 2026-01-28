import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'

function Pagination () {
  const PAGE_SIZE = 20
  const data = useLoaderData()
  const count = data?.count ? data.count : 0
  const { pathname, search } = useLocation()
  let page = Number(new URLSearchParams(search).get('page') ?? 1)
  const isPreviousPage = data.previous?.length ? data.previous.length : null
  const isNextPage = data.next?.length ? data.next.length : null
  const lastPage = Math.ceil(count / PAGE_SIZE)
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
      >
        {pageNumber}
      </button>
    )
  }

  function renderPageButtons () {
    const pageButtons = []

    // first button
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }))
    // dots
    if (page > 2) {
      pageButtons.push(
        <button className='pagination__page btn btn--page' key='dots-1'>
          ...
        </button>
      )
    }
    // active button
    if (page !== 1 && page !== lastPage) {
      pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }))
    }
    // dots
    if (page < lastPage - 1) {
      pageButtons.push(
        <button className='pagination__page btn btn--page' key='dots-2'>
          ...
        </button>
      )
    }
    // last button
    pageButtons.push(
      addPageButton({ pageNumber: lastPage, activeClass: page === lastPage })
    )

    return pageButtons
  }

  return (
    <div className='pagination '>
      <button
        type='button'
        onClick={() => {
          let previousPage = page - 1
          if (!isPreviousPage) previousPage = lastPage

          handlePageChange(previousPage)
        }}
        className='pagination__nav btn btn--navigation'
      >
        <ChevronLeft></ChevronLeft>
        <span className='sr-only'>Previous page</span>
      </button>

      {renderPageButtons()}

      <button
        type='button'
        onClick={() => {
          let nextPage = page + 1
          if (!isNextPage) nextPage = 1

          handlePageChange(nextPage)
        }}
        className='pagination__nav btn btn--navigation '
      >
        <ChevronRight></ChevronRight>
        <span className='sr-only'>Next page</span>
      </button>
    </div>
  )
}

export default Pagination
