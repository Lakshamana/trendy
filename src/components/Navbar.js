import React, { useContext } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './css/Navbar.css'
import { UserContext } from '../contexts/userContext'

const Navbar = ({ logoutUser, location, history }) => {
  const context = useContext(UserContext)

  const handleLogout = () => {
    logoutUser()
    history.go('/')
  }

  return (
    <nav className='nav-wrapper nav-custom blue lighten-1'>
      <Link to='/' className='brand-logo'>
        Trendy
      </Link>
      <ul className='right'>
        {context.username && <li>Hello, {context.username}</li>}
        <li className={location.pathname === '/about' ? 'active' : ''}>
          <Link to='/about'>About</Link>
        </li>
        <li>
          {context.username && (
            <button
              className='waves-effect waves-light red btn'
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
