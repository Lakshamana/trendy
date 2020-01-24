/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Centered from './hoc/Centered'
import { sendToast } from '../util/util'

const { trendyAxios } = require('../../plugins/axios.plugin')

const Auth = props => {
  console.log(props)
  const { changeUser, location, history } = props
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
    const useFormData = mode === 'login' ? loginFormData : registerFormData
    trendyAxios
      .post(`/${mode}`, useFormData)
      .then(() => {
        if (mode === 'login') {
          changeUser(useFormData)
          let { from } = location.state || { from: { pathname: '/' } }
          console.log(from)
          history.replace(from)
        }
      })
      .catch(err => sendToast(err))
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
        <div className='input-field'>
          <input
            id='iptUsername'
            ref={loginRefs[0]}
            type='text'
            minLength='5'
            className='validate'
            onChange={e => handleFormChange(e, 'username')}
          />
          <label htmlFor='iptUsername'>Username</label>
        </div>
        <div className='input-field'>
          <input
            id='iptPassword'
            ref={loginRefs[1]}
            type='password'
            minLength='6'
            className='validate'
            onChange={e => handleFormChange(e, 'password')}
          />
          <label htmlFor='iptPassword'>Password</label>
        </div>
        <label style={{ float: 'right', margin: '1.2em 0' }}>
          <input
            type='checkbox'
            onChange={e => handleFormChange(e, 'remember')}
          />
          <span>Remember me</span>
        </label>
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
        <div className='input-field'>
          <input
            id='iptRegUsername'
            ref={registerRefs[0]}
            type='text'
            minLength='5'
            className='validate'
            onChange={e => handleFormChange(e, 'username')}
          />
          <label htmlFor='iptRegUsername'>Username</label>
        </div>
        <div className='input-field'>
          <input
            id='iptRegPassword'
            ref={registerRefs[1]}
            type='password'
            minLength='6'
            className='validate'
            onChange={e => handleFormChange(e, 'password')}
          />
          <label htmlFor='iptRegPassword'>Password</label>
        </div>
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
        <div className='card-content'>
          <div className='card-title'>{pageContent.title[mode]}</div>
          {pageContent.form[mode]}
          <br />
          <span style={{ float: 'right', fontSize: '8pt' }}>
            <a onClick={toggleMode}>{pageContent.toggle[mode]}</a>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Centered(Auth)
