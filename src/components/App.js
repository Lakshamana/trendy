import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'materialize-css/dist/css/materialize.min.css'

import Home from './Home'
import About from './About'
import Navbar from './Navbar'
import Auth from './Auth'
import Guard from './Guard'
import { UserContext, defaultUser } from '../contexts/userContext'
import { persist } from '../util/util'
import authGuard from './guard/authGuard'

function App() {
  const [user, setUser] = useState(defaultUser)

  function changeUser(user) {
    setUser(user)
    persist('username', user.username)
    persist('lastLogin', Date.now())
  }

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Navbar />
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
    </UserContext.Provider>
  )
}

export default App
