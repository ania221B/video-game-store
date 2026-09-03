import { Link, useLoaderData, useRouteLoaderData } from 'react-router-dom'
import { AccordionPanel, CustomSelect } from '../ui'
import { useQuery } from '@tanstack/react-query'
import { genresQuery } from '../../api'
import { platformsQuery } from '../../api/queries'

function FilterMenu () {
  const { data: genresData } = useQuery(genresQuery())
  const { data: platformsData } = useQuery(platformsQuery())
  const genres = genresData?.results || []
  const platforms = platformsData?.results || []

  return (
    <aside className='filter-menu'>
      <div className='accordion'>
        <AccordionPanel
          title='genres'
          list={genres.toSorted((a, b) => a.name.localeCompare(b.name))}
        ></AccordionPanel>

        <AccordionPanel
          title='platforms'
          list={platforms.toSorted((a, b) => a.name.localeCompare(b.name))}
        ></AccordionPanel>
      </div>

      <CustomSelect></CustomSelect>

      <Link
        to='/products'
        className='btn filter-menu__btn reset-btn'
        data-button='primary'
      >
        <span>Reset</span>
        <span>Reset</span>
      </Link>
    </aside>
  )
}

export default FilterMenu
