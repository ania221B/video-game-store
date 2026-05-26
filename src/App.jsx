import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient, supabase } from './lib'
import { router } from './router'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setUser, clearUser } from './features/auth/authSlice'

function App () {
  const dispatch = useDispatch()

  useEffect(() => {
    supabase.auth.getClaims().then(({ data }) => {
      if (data?.claims) dispatch(setUser(data.claims))
    })

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(() => {
      supabase.auth.getClaims().then(({ data }) => {
        data?.claims ? dispatch(setUser(data.claims)) : dispatch(clearUser())
      })
    })

    return () => subscription.unsubscribe()
  }, [dispatch])

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  )
}

export default App
