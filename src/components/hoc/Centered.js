/* eslint-disable react/display-name */
import React, { useEffect } from 'react'
import '../css/Centered.css'

const Centered = Component => props => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => (document.body.style.overflow = '')
  })

  return (
    <div className='d-table'>
      <div className='d-cell'>
        <Component {...props} />
      </div>
    </div>
  )
}

export default Centered
