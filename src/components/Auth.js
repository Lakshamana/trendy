/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

import Centered from './hoc/Centered'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import { sendToast } from '../util/util'

const { trendyAxios } = require('../../plugins/axios.plugin')

const Auth = ({ changeUser, location, history }) => {
  const [mode, setMode] = useState('login')

  function handleSubmit(e, formData) {
    e.preventDefault()
    formData.rememberMe = formData.rememberMe === 'on'
    trendyAxios
      .post(`/${mode}`, formData)
      .then(() => {
        if (mode === 'login') {
          changeUser(formData)
          const { from } = location.state || { from: { pathname: '/' } }
          history.replace(from)
        } else {
          sendToast('Account created successfully!')
          setMode('login')
        }
      })
      .catch(({ response }) => sendToast(response.data.messageCode))
  }

  function toggleMode() {
    setMode(mode === 'login' ? 'register' : 'login')
  }

  const pageContent = {
    title: {
      login: 'Login',
      register: 'Register'
    },

    form: {
      login: <LoginForm handleSubmit={handleSubmit} />,
      register: <RegisterForm handleSubmit={handleSubmit} />
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
