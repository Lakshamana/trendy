import React, { useState } from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'

import { lt, required } from '../util/validators'

const LoginForm = () => {
  const [loginValidForm, setLoginValidForm] = useState(false)

  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  })

  let usernameRef, passwordRef

  function checkFormValidity() {
    console.log('check!')
    const refs = [usernameRef, passwordRef]
    const valid = refs.every(({ current }) => {
      console.log(
        current.id + ': ' + current.value,
        current.validity.valid,
        current.validity
      )
      return current && current.value && current.validity.valid
    })
    console.log('valid:', valid)
    setLoginValidForm(valid)
  }

  function handleFormChange(e, field) {
    setLoginFormData({
      ...loginFormData,
      [field]: e.target.value
    })
    console.log(usernameRef, passwordRef)
    checkFormValidity()
  }

  return (
    <Form>
      <div className='input-field'>
        <Input
          name='username'
          ref={ref => (usernameRef = ref)}
          type='text'
          minLength='5'
          className='validate'
          validators={[required, lt]}
          onChange={e => handleFormChange(e, 'username')}
        />
        <label>Username</label>
      </div>
      <div className='input-field'>
        <input
          name='password'
          ref={ref => (passwordRef = ref)}
          type='password'
          minLength='6'
          className='validate'
          required
          value={loginFormData.password}
          onChange={e => handleFormChange(e, 'password')}
        />
        <label htmlFor='iptPassword'>Password</label>
      </div>
      <label style={{ float: 'right', margin: '1.2em 0' }}>
        <input
          type='checkbox'
          onChange={e => handleFormChange(e, 'rememberMe')}
        />
        <span>Remember me</span>
      </label>
      <div style={{ clear: 'both' }} className='container'>
        <button
          className='btn waves-effect waves-light btn-small'
          type='submit'
          name='action'
          disabled={!loginValidForm}
        >
          Submit
        </button>
      </div>
    </Form>
  )
}

export default LoginForm
