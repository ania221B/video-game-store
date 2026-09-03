import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib'

import background from '../assets/images/placeholder/placeholder-1200.webp'
import { Loader } from '../components/common'
import { ArrowRight, CircleAlert, LoaderCircle } from 'lucide-react'

function Login () {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth)
  const [formHeight, setFormHeight] = useState(0)
  const formRef = useRef(null)

  // redirect if logged in
  useEffect(() => {
    if (user) navigate('/')
  }, [user])

  // handle magic link callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token_hash = params.get('token_hash')
    const type = params.get('type')

    if (!token_hash) return

    supabase.auth
      .verifyOtp({ token_hash, type: type || 'email' })
      .then(({ error }) => {
        if (!error) {
          window.history.replaceState({}, '', '/login')
          navigate('/')
        }
      })
  }, [])

  useEffect(() => {
    if (formRef.current) {
      const height = formRef.current.getBoundingClientRect().height
      setFormHeight(height)
    }
  })

  function validateEmail (email) {
    return /^[a-zA-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
      ? ''
      : 'Invalid email'
  }

  async function handleLogin (e) {
    e.preventDefault()
    const emailCheck = validateEmail(email)
    if (emailCheck) {
      setEmailError(emailCheck)
      return
    }
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + '/login'
      }
    })
    if (!error) setSent(true)

    setLoading(false)
  }

  function handleChange (e) {
    setEmailError('')
    setEmail(e.target.value)
  }

  if (sent) {
    return (
      <main>
        <section className='login stack-grid'>
          <picture className='bg-img'>
            <img src={background} alt='' />
          </picture>
          <div className='main-content'>
            <div className='form-wrapper' style={{ height: `${formHeight}px` }}>
              <div
                className={`
                  form-wrapper__confirmation ${
                    sent ? 'form-fade-in' : 'form-fade-out'
                  } flow`}
              >
                <header className='flow'>
                  <h1>Almost done!</h1>
                  <p>Check your email for a magic link</p>
                </header>

                <div className='spinner-container'>
                  <LoaderCircle className='spinner'></LoaderCircle>
                  <p className='sr-only'>Loading...</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main>
      <section className='login stack-grid'>
        <picture className='bg-img'>
          <img src={background} alt='' />
        </picture>
        <div className='main-content'>
          <div className='form-wrapper' ref={formRef}>
            <form
              className={`form form--login ${
                sent ? 'form-fade-out' : 'form-fade-in'
              }`}
              onSubmit={handleLogin}
            >
              <header className='flow'>
                <h1>Login</h1>
                <p>Enter your email below to login to your account</p>
              </header>
              <div className='form__control-wrapper'>
                <label htmlFor='email'>Email:</label>
                <input
                  id='email'
                  name='email'
                  value={email}
                  type='email'
                  onChange={handleChange}
                  required
                />
                <div className='form__error'>
                  {emailError && (
                    <>
                      <CircleAlert size={18}></CircleAlert>
                      <p className='fs-300'>{emailError}</p>
                    </>
                  )}
                </div>
              </div>
              {email === '' ? (
                <button
                  type='submit'
                  className='btn'
                  disabled={true}
                  data-button='primary'
                >
                  <span>Continue with Email</span>
                  <span aria-hidden='true'>Continue with Email</span>
                </button>
              ) : (
                <button
                  type='submit'
                  className='btn'
                  disabled={loading}
                  data-button='primary'
                >
                  {loading ? (
                    <>
                      <span>Sending Link...</span>
                      <span aria-hidden='true'>Sending Link...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue with Email</span>
                      <span aria-hidden='true'>Continue with Email</span>
                    </>
                  )}
                </button>
              )}
              <Link
                to='/'
                className='btn home-link'
                data-button='outline'
                aria-label='go back to homepage'
              >
                <span>go back home</span>
                <span>
                  <ArrowRight></ArrowRight>
                </span>
              </Link>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Login
