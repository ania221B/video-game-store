import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomeLayout } from './components/layout'
import { Error, Landing } from './pages'
import Products from './pages/Products'
import SingleProduct from './pages/SingleProduct'

// loaders
import { loader as genresLoader } from './components/layout/HomeLayout'
import { loader as landingLoader } from './pages/Landing'
import { loader as productsLoader } from './pages/Products'

// actions

const router = createBrowserRouter([
  {
    path: '/',
    id: 'root',
    element: <HomeLayout></HomeLayout>,
    errorElement: <Error></Error>,
    loader: genresLoader,

    children: [
      {
        index: true,
        element: <Landing></Landing>,
        loader: landingLoader
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
