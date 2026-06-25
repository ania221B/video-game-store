import { createBrowserRouter } from 'react-router-dom'
import { queryClient } from './lib'
import { HomeLayout } from './components/layout'
import {
  Account,
  Cart,
  Checkout,
  Error,
  Genres,
  Landing,
  Login,
  Products,
  SingleGenre,
  SingleProduct,
  Wishlist
} from './pages'
import { ProtectedRoute } from './components/common'

// loaders
import { loader as genresLoader } from './components/layout/HomeLayout'
import { loader as landingLoader } from './pages/Landing'
import { loader as productsLoader } from './pages/Products'
import { loader as singleProductLoader } from './pages/SingleProduct'
import { loader as singleGenreLoader } from './pages/SingleGenre'
import { loader as wishlistLoader } from './pages/Wishlist'
// actions

export const router = createBrowserRouter([
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
      },
      {
        path: 'checkout',
        element: (
          <ProtectedRoute>
            <Checkout></Checkout>
          </ProtectedRoute>
        ),
        errorElement: <Error></Error>
      },
      {
        path: 'account',
        element: (
          <ProtectedRoute>
            <Account></Account>
          </ProtectedRoute>
        ),
        errorElement: <Error></Error>
      },
      {
        path: 'wishlist',
        element: (
          <ProtectedRoute>
            <Wishlist></Wishlist>
          </ProtectedRoute>
        ),
        errorElement: <Error></Error>,
        loader: wishlistLoader(queryClient)
      }
    ]
  },
  {
    path: '/login',
    element: <Login></Login>,
    errorElement: <Error></Error>
  }
])
