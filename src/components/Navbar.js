import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import './css/Navbar.css'
import { recover } from '../util/util'

const Navbar = ({ logoutUser, location, history }) => {
  const handleLogout = () => {
    logoutUser()
    history.go('/')
  }

  const user = recover('username')

  return (
    <nav className='nav-wrapper nav-custom blue lighten-1'>
      <Link to='/' className='brand-logo'>
        Trendy
      </Link>
      <ul className='right'>
        {user && (
          <li>
            <span className='mx'>Hello, {user}</span>
          </li>
        )}
        <li className={location.pathname === '/about' ? 'active' : ''}>
          <Link to='/about'>About</Link>
        </li>
        <li>
          {user && (
            <button
              className='waves-effect waves-light red btn mx'
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Navbar)
