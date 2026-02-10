import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomeLayout } from './components/layout'
import { Error, Landing } from './pages'
import Products from './pages/Products'
import SingleProduct from './pages/SingleProduct'

// loaders
import { loader as productsLoader } from './pages/Products'
import { loader as metadataLoader } from './components/layout/HomeLayout'
// actions

const router = createBrowserRouter([
  {
    path: '/',
    id: 'home',
    element: <HomeLayout></HomeLayout>,
    errorElement: <Error></Error>,
    loader: metadataLoader,
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
        path: 'products/:slug',
        element: <SingleProduct></SingleProduct>
      }
    ]
  }
])

function App () {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
