import React, { useEffect } from 'react'
import Centered from './hoc/Centered'

const About = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => (document.body.style.overflow = '')
  })

  return (
    <div className='card'>
      <div className='card-title'>About</div>
      <div className='card-content'>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi,
        doloribus ipsum. Vel harum dolor voluptatibus omnis voluptate velit
        officia fuga, adipisci expedita! Eaque dicta reprehenderit explicabo vel
        iusto debitis ut?
      </div>
    </div>
  )
}

export default Centered(About)
