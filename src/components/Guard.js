import React, { useState, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'

/**
 * 
 * @param {Object}  {
    children: Children components
    guard: [() => Promise] guard function
    redirectTo: [string] redirect-to path
    ...rest: other props you may want to pass
 }
 */
function Guard({ children, guard, redirectTo, ...rest }) {
  const [renderFn, setRenderFn] = useState(undefined)
  useEffect(() => {
    guard()
      .then(() => {
        setRenderFn(() => () => children)
      })
      .catch(() => {
        setRenderFn(() => ({ location }) => (
          <Redirect
            to={{
              pathname: redirectTo,
              state: { from: location }
            }}
          />
        ))
      })
  }, [])
  return renderFn ? (
    <Route {...rest} render={renderFn} />
  ) : (
    <div>loading...</div>
  )
}

export default Guard
