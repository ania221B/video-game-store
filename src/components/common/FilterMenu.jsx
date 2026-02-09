import { Link, useRouteLoaderData } from 'react-router-dom'
import { AccordionPanel } from '../ui'
import CustomSelect from '../ui/CustomSelect'

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

      <Link to='/products' className='btn' style={{textDecoration: 'none', paddingBlock: '8px', paddingInline: '24px', marginBlock: '16px'}}>
        Reset
      </Link>
    </aside>
  )
}

export default FilterMenu
