/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Centered from './hoc/Centered'
import { sendToast } from '../util/util'

const { trendyAxios } = require('../../plugins/axios.plugin')

const Auth = ({ changeUser, location, history }) => {
  const [loginValidForm, setLoginValidForm] = useState(false)
  const [registerValidForm, setRegisterValidForm] = useState(false)

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

  let loginRefs = Array.from({ length: 2 }, () => React.createRef())
  let registerRefs = Array.from({ length: 2 }, () => React.createRef())

  function handleSubmit(e) {
    e.preventDefault()
    const useFormData = mode === 'login' ? loginFormData : registerFormData
    useFormData.rememberMe = useFormData.rememberMe === 'on'
    trendyAxios.post(`/${mode}`, useFormData).then(() => {
      if (mode === 'login') {
        changeUser(useFormData)
        const { from } = location.state || { from: { pathname: '/' } }
        history.replace(from)
      } else setMode('login')
    })
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
  }

  useEffect(() => {
    checkFormValidity()
  }, [registerFormData, loginFormData])

  function checkFormValidity() {
    console.log('check!')
    const useRefs = mode === 'login' ? loginRefs : registerRefs
    const valid = useRefs.every(({ current }) => {
      console.log(
        current.id + ': ' + current.value,
        current.validity.valid,
        current.validity
      )
      return current && current.value && current.validity.valid
    })
    console.log('valid:', valid)
    const useSetFn = mode === 'login' ? setLoginValidForm : setRegisterValidForm
    useSetFn(valid)
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
            required
            value={loginFormData.username}
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
            value={registerFormData.username}
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
            value={registerFormData.password}
            onChange={e => handleFormChange(e, 'password')}
          />
          <label htmlFor='iptRegPassword'>Password</label>
        </div>
        <button
          className='btn waves-effect waves-light btn-small'
          type='submit'
          name='action'
          disabled={!registerValidForm}
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
