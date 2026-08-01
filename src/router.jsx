import { createBrowserRouter } from 'react-router-dom'
import { queryClient } from './lib'
import { lazy, Suspense } from 'react'
import { HomeLayout } from './components/layout'
const Account = lazy(() => import('./pages/Account.jsx'))
const Cart = lazy(() => import('./pages/Cart.jsx'))
const Checkout = lazy(() => import('./pages/Checkout.jsx'))
const CheckoutThankYou = lazy(() => import('./pages/CheckoutThankYou.jsx'))
const Genres = lazy(() => import('./pages/Genres.jsx'))
const Landing = lazy(() => import('./pages/Landing.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const Orders = lazy(() => import('./pages/Orders.jsx'))
const Products = lazy(() => import('./pages/Products.jsx'))
const SingleGenre = lazy(() => import('./pages/SingleGenre.jsx'))
const SingleOrder = lazy(() => import('./pages/SingleOrder.jsx'))
const SingleProduct = lazy(() => import('./pages/SingleProduct.jsx'))
const Wishlist = lazy(() => import('./pages/Wishlist.jsx'))
import { Error } from './pages'
import { Loader, ProtectedRoute } from './components/common'

// loaders

import {
  genresLoader,
  landingLoader,
  productsLoader,
  singleProductLoader,
  singleGenreLoader,
  wishlistLoader,
  ordersLoader
} from './loaders'

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
        element: (
          <Suspense fallback={<Loader></Loader>}>
            <Landing></Landing>
          </Suspense>
        ),
        errorElement: <Error></Error>,
        loader: landingLoader(queryClient)
      },
      {
        path: 'products',
        element: (
          <Suspense fallback={<Loader></Loader>}>
            <Products></Products>
          </Suspense>
        ),
        errorElement: <Error></Error>,
        loader: productsLoader(queryClient)
      },
      {
        path: 'products/:id/:slug',
        element: (
          <Suspense fallback={<Loader></Loader>}>
            <SingleProduct></SingleProduct>
          </Suspense>
        ),
        errorElement: <Error></Error>,
        loader: singleProductLoader(queryClient)
      },
      {
        path: 'cart',
        element: (
          <Suspense fallback={<Loader></Loader>}>
            <Cart></Cart>
          </Suspense>
        ),
        errorElement: <Error></Error>
      },
      {
        path: 'genres',
        element: (
          <Suspense fallback={<Loader></Loader>}>
            <Genres></Genres>
          </Suspense>
        ),
        errorElement: <Error></Error>
      },
      {
        path: 'genres/:id/:slug',
        element: (
          <Suspense fallback={<Loader></Loader>}>
            <SingleGenre></SingleGenre>
          </Suspense>
        ),
        errorElement: <Error></Error>,
        loader: singleGenreLoader(queryClient)
      },
      {
        path: 'checkout',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader></Loader>}>
              <Checkout></Checkout>
            </Suspense>
          </ProtectedRoute>
        ),
        errorElement: <Error></Error>
      },
      {
        path: 'checkout/thank-you',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader></Loader>}>
              <CheckoutThankYou></CheckoutThankYou>
            </Suspense>
          </ProtectedRoute>
        ),
        errorElement: <Error></Error>
      },
      {
        path: 'account',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader></Loader>}>
              <Account></Account>
            </Suspense>
          </ProtectedRoute>
        ),
        errorElement: <Error></Error>
      },
      {
        path: 'wishlist',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader></Loader>}>
              <Wishlist></Wishlist>
            </Suspense>
          </ProtectedRoute>
        ),
        errorElement: <Error></Error>,
        loader: wishlistLoader(queryClient)
      },
      {
        path: 'orders',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader></Loader>}>
              <Orders></Orders>
            </Suspense>
          </ProtectedRoute>
        ),
        errorElement: <Error></Error>,
        loader: ordersLoader(queryClient)
      },
      {
        path: 'orders/:id',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader></Loader>}>
              <SingleOrder></SingleOrder>
            </Suspense>
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <Login></Login>
      </Suspense>
    ),
    errorElement: <Error></Error>
  }
])
