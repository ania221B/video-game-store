import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomeLayout } from './components/layout'
import { Error, Landing } from './pages'
import Products from './pages/Products'
import SingleProduct from './pages/SingleProduct'

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
        element: <Products></Products>
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
