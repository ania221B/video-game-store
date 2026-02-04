import { useNavigation } from 'react-router-dom'
import { Loader } from '../common'
import { ProductCard } from '../ui'

function ProductList ({ products }) {
  const navigation = useNavigation()

  if (navigation.state === 'loading') {
    return <Loader></Loader>
  }
  if (!products.length) {
    return (
      <div className='item-area__list grid-auto-fit'>
        <h2>Sorry... Nothing to display here.</h2>
        <p>Try searching for something else or refreshing the page.</p>
      </div>
    )
  }
  return (
    <ul className='item-area__list grid-auto-fit'>
      {products.map(product => {
        return (
          <li key={product.id}>
            <ProductCard item={product}></ProductCard>
          </li>
        )
      })}
    </ul>
  )
}

export default ProductList
