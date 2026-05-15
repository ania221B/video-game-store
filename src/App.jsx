import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomeLayout } from './components/layout'
import {
  Cart,
  Error,
  Genres,
  Landing,
  Products,
  SingleGenre,
  SingleProduct
} from './pages'

// loaders
import { loader as genresLoader } from './components/layout/HomeLayout'
import { loader as landingLoader } from './pages/Landing'
import { loader as productsLoader } from './pages/Products'
import { loader as singleProductLoader } from './pages/SingleProduct'
import { loader as singleGenreLoader } from './pages/SingleGenre'
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
      },
      {
        path: 'genres',
        element: <Genres></Genres>,
        errorElement: <Error></Error>
      },
      {
        path: 'genres/:id/:slug',
        element: <SingleGenre></SingleGenre>,
        errorElement: <Error></Error>,
        loader: singleGenreLoader(queryClient)
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
