import { useNavigation } from 'react-router-dom'
import { Loader } from '../common'
import { ProductCard } from '../ui'

function ProductList ({
  products,
  emptyMsg = {
    heading: 'Sorry... Nothing to display here.',
    text: 'Try searching for something else or refreshing the page.'
  }
}) {
  const navigation = useNavigation()

  if (navigation.state === 'loading') {
    return <Loader></Loader>
  }
  if (!products.length) {
    return (
      <div className='item-area__list item-area__list--empty flow'>
        <h2>{emptyMsg.heading}</h2>
        <p>{emptyMsg.text}</p>
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
