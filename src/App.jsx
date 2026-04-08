import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomeLayout } from './components/layout'
import { Cart, Error, Landing } from './pages'
import Products from './pages/Products'
import SingleProduct from './pages/SingleProduct'

// loaders
import { loader as genresLoader } from './components/layout/HomeLayout'
import { loader as landingLoader } from './pages/Landing'
import { loader as productsLoader } from './pages/Products'
import { loader as singleProductLoader } from './pages/SingleProduct'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// actions

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    id: 'root',
    element: <HomeLayout></HomeLayout>,
    errorElement: <Error></Error>,
    loader: genresLoader(queryClient),

    children: [
      {
        index: true,
        element: <Landing></Landing>,
        errorElement: <Error></Error>,
        loader: landingLoader(queryClient)
      },
      {
        path: 'products',
        element: <Products></Products>,
        errorElement: <Error></Error>,
        loader: productsLoader(queryClient)
      },
      {
        path: 'products/:id/:slug',
        element: <SingleProduct></SingleProduct>,
        errorElement: <Error></Error>,
        loader: singleProductLoader(queryClient)
      },
      {
        path: 'cart',
        element: <Cart></Cart>,
        errorElement: <Error></Error>
      }
    ]
  }
])

function App () {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  )
}

export default App
