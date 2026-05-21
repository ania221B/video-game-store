import Navigation from './Navigation'

function Header ({ headerRef }) {
  return (
    <header className='primary-header line-decoration' ref={headerRef}>
      <div className='container'>
        <Navigation></Navigation>
      </div>
    </header>
  )
}

export default Header
