import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './Home/Home'
import About from './About/About'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
