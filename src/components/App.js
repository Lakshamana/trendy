import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'materialize-css/dist/css/materialize.min.css'

import Home from './Home'
import About from './About'
import Navbar from './Navbar'
import Auth from './Auth'
import Guard from './Guard'
import { persist, remove } from '../util/util'
import authGuard from './guard/authGuard'

function App() {
  function changeUser(user) {
    persist('username', user.username)
    persist('lastLogin', Date.now())
  }

  function logoutUser() {
    remove('username')
    remove('lastLogin')
  }

  return (
    <BrowserRouter>
      <Navbar logoutUser={logoutUser} />
      <Switch>
        <Route
          path='/auth'
          render={props => <Auth {...props} changeUser={changeUser} />}
        />
        <Route path='/about' component={About} />
        <Guard guard={authGuard} redirectTo='/auth'>
          <Route exact path='/' component={Home} />
        </Guard>
      </Switch>
    </BrowserRouter>
  )
}

export default App
