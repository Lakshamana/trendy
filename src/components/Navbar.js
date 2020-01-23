import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import './css/Navbar.css'

const Navbar = ({ location }) => {
  return (
    <nav className='nav-wrapper nav-custom blue lighten-1'>
      <Link to='/' className='brand-logo'>
        Trendy
      </Link>
      <ul className='right'>
        <li className={location.pathname === '/about' ? 'active' : ''}>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Navbar)
