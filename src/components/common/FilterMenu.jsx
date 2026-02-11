import { Link, useRouteLoaderData } from 'react-router-dom'
import { AccordionPanel } from '../ui'
import CustomSelect from '../ui/CustomSelect'

function FilterMenu () {
  const { genresData, platformsData } = useRouteLoaderData('home')
  const genres = genresData.results
  const platforms = platformsData.results

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

      <Link to='/products' className='btn filter-menu__btn' data-button='primary'>       
        <span>Reset</span>
        <span>Reset</span>      
      </Link>
    </aside>
  )
}

export default FilterMenu
