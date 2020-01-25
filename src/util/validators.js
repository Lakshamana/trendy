import React from 'react'

const required = value => {
  if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return ''
  }
}

const lt = (value, { minLength }) => {
  // get the maxLength from component's props
  if (!value.toString().trim().length < minLength) {
    // Return jsx
    return (
      <span className='red-text'>
        The value is less than {minLength} symbols.
      </span>
    )
  }
}

const password = (value, props, components) => {
  // NOTE: Tricky place. The 'value' argument is always current component's value.
  // So in case we're 'changing' let's say 'password' component - we'll compare it's value with 'confirm' value.
  // But if we're changing 'confirm' component - the condition will always be true
  // If we need to always compare own values - replace 'value' with components.password[0].value and make some magic with error rendering.
  if (value !== components['confirm'][0].value) {
    // components['password'][0].value !== components['confirm'][0].value
    // 'confirm' - name of input
    // components['confirm'] - array of same-name components because of checkboxes and radios
    return <span className='red-text'>Passwords are not equal.</span>
  }
}

export { required, password, lt }
