import React, { useEffect } from 'react'
import Centered from './hoc/Centered'

const About = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => (document.body.style.overflow = '')
  })

  return (
    <div className='container'>
      <div className='card'>
        <div className='card-content'>
          <div className='card-title'>About</div>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi,
          doloribus ipsum. Vel harum dolor voluptatibus omnis voluptate velit
          officia fuga, adipisci expedita! Eaque dicta reprehenderit explicabo
          vel iusto debitis ut?
        </div>
      </div>
    </div>
  )
}

export default Centered(About)
