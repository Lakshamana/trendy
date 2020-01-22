import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = props => {
  console.log(props)
  return (
    <nav className='nav-wrapper indigo darken-4'>
      <Link to='/' className='brand-logo'>
        Bloggy
      </Link>
      <ul className='right'>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
