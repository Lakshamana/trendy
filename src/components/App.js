import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'materialize-css/dist/css/materialize.min.css'

import Home from './Home'
import About from './About'
import Navbar from './Navbar'
import Auth from './Auth'
import { UserContext, defaultUser } from '../contexts/userContext'

function App() {
  const [user, setUser] = useState(defaultUser)

  function changeUser(user) {
    setUser(user)
  }

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/auth'>
            <Auth changeUser={changeUser} />
          </Route>
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
