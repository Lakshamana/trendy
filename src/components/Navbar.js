import React from 'react'
import { Link } from 'react-router-dom'
import './css/Navbar.css'

const Navbar = () => {
  return (
    <nav className='nav-wrapper nav-custom blue lighten-1'>
      <Link to='/' className='brand-logo'>
        Trendy
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
