function Tooltip ({ text, children }) {
  return (
    <div className='tooltip'>
      {children}
      <span className='tooltip__text' aria-hidden='true'>
        {text}
      </span>
    </div>
  )
}

export default Tooltip
