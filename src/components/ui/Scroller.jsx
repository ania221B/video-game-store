import { Link } from 'react-router-dom'

function Scroller ({ slideList }) {
  return (
    <ul className='scroller scroll-snapping'>
      {slideList.map(slide => {
        const { id, name, slug, games_count, image_background } = slide
        return (
          <li key={id}>
            <article className='scroller__item'>
              <div className='scroller__item__img'>
                <img src={image_background} alt={name} />
              </div>
              <header>
                <h2>
                  <Link to={`/genres/${slug}`}>{name}</Link>
                </h2>
                <p>games: {games_count}</p>
              </header>
            </article>
          </li>
        )
      })}
    </ul>
  )
}

export default Scroller
