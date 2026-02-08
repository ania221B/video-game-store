import { Link, useRouteLoaderData, useSearchParams } from 'react-router-dom'
import { AccordionPanel } from '../ui'
import CustomSelect from '../ui/CustomSelect'

// make the menu an accordion?
function FilterMenu () {
  const { genresData, platformsData } = useRouteLoaderData('home')
  const genres = genresData.results
  const platforms = platformsData.results

  return (
    <aside>
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
    </aside>
  )
}

export default FilterMenu
