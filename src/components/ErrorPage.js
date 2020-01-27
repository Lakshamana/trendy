import React from 'react'
import Centered from './hoc/Centered'

const ErrorPage = ({ location }) => {
  return (
    <div className='container'>
      <div className='card'>
        <div className='card-content'>
          <div className='card-title'>Error</div>
          <p>
            Page <code>{location.pathname}</code> not found!
          </p>
        </div>
      </div>
    </div>
  )
}

export default Centered(ErrorPage)
