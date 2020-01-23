/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Centered from './hoc/Centered'
const { trendyAxios } = require('../../plugins/axios.plugin')

const Auth = ({ changeUser }) => {
  const [validForm, setValidForm] = useState(false)

  const [registerFormData, setRegisterFormData] = useState({
    username: '',
    password: ''
  })

  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  })

  const [mode, setMode] = useState('login')

  const loginRefs = Array.from({ length: 2 }, () => React.createRef())
  const registerRefs = Array.from({ length: 2 }, () => React.createRef())

  function handleSubmit(e) {
    e.preventDefault()
    // trendyAxios.post(`/${endpoint}`, inputFormData).then(() => {
    //   if (endpoint === 'login') changeUser(inputFormData)
    // })
  }

  function handleFormChange(e, field) {
    const [formData, setFormData] =
      mode === 'login'
        ? [loginFormData, setLoginFormData]
        : [registerFormData, setRegisterFormData]
    setFormData({
      ...formData,
      [field]: e.target.value
    })
    checkFormValidity()
  }

  function checkFormValidity() {
    const useRefs = mode === 'login' ? loginRefs : registerRefs
    const valid = useRefs.every(
      ({ current }) => current.value && current.validity.valid
    )
    setValidForm(valid)
  }

  function toggleMode() {
    setMode(mode === 'login' ? 'register' : 'login')
  }

  const loginForm = (
    <div id='loginForm'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='iptUsername' style={{ float: 'left' }}>
          Username
        </label>
        <input
          id='iptUsername'
          ref={loginRefs[0]}
          type='text'
          minLength='5'
          placeholder='Username'
          className='validate'
          onChange={e => handleFormChange(e, 'username')}
        />
        <br />
        <label htmlFor='iptPassword' style={{ float: 'left' }}>
          Password
        </label>
        <input
          id='iptPassword'
          ref={loginRefs[1]}
          type='password'
          minLength='6'
          placeholder='Password'
          className='validate'
          onChange={e => handleFormChange(e, 'password')}
        />
        <br />
        <label style={{ float: 'right', margin: '1.2em 0' }}>
          <input type='checkbox' />
          <span>Remember me</span>
        </label>
        <br />
        <div style={{ clear: 'both' }} className='container'>
          <button
            className='btn waves-effect waves-light btn-small'
            type='submit'
            name='action'
            disabled={!validForm}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )

  const registerForm = (
    <div id='registerForm'>
      <form onSubmit={handleSubmit}>
        <input
          ref={registerRefs[0]}
          type='text'
          minLength='5'
          placeholder='Username'
          className='validate'
          onChange={e => handleFormChange(e, 'username')}
        />
        <br />
        <input
          ref={registerRefs[1]}
          type='password'
          minLength='6'
          placeholder='Password'
          className='validate'
          onChange={e => handleFormChange(e, 'password')}
        />
        <br />
        <button
          className='btn waves-effect waves-light btn-small'
          type='submit'
          name='action'
          disabled={!validForm}
        >
          Register
        </button>
      </form>
    </div>
  )

  const pageContent = {
    title: {
      login: 'Login',
      register: 'Register'
    },

    form: {
      login: loginForm,
      register: registerForm
    },

    toggle: {
      login: 'No account yet?',
      register: "I've already got an account!"
    }
  }

  return (
    <div className='container' style={{ width: '30vw' }}>
      <div className='card'>
        <div className='card-title'>{pageContent.title[mode]}</div>
        <div className='card-content'>
          {pageContent.form[mode]}
          <br />
          <span style={{ float: 'right', 'font-size': '8pt' }}>
            <a onClick={toggleMode}>{pageContent.toggle[mode]}</a>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Centered(Auth)
