import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomeLayout } from './components/layout'
import { Error, Landing } from './pages'
import Products from './pages/Products'
import SingleProduct from './pages/SingleProduct'

// loaders
import { loader as productsLoader } from './pages/Products'
// actions

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout></HomeLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <Landing></Landing>
      },
      {
        path: 'products',
        element: <Products></Products>,
        loader: productsLoader
      },
      {
        path: 'products/:id',
        element: <SingleProduct></SingleProduct>
      }
    ]
  }
])

function App () {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
