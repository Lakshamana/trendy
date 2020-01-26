import React, { useState } from 'react'

const LoginForm = ({ handleSubmit }) => {
  const [loginValidForm, setLoginValidForm] = useState(false)

  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  })

  let [refs] = useState(Array.from({ length: 2 }, () => React.createRef()))

  function checkFormValidity() {
    const valid = refs.every(
      ({ current }) => current && current.value && current.validity.valid
    )
    setLoginValidForm(valid)
  }

  function handleFormChange(e, field) {
    setLoginFormData({
      ...loginFormData,
      [field]: e.target.value
    })
    checkFormValidity()
  }

  return (
    <form onSubmit={e => handleSubmit(e, loginFormData)}>
      <div className='input-field'>
        <input
          id='username'
          ref={refs[0]}
          type='text'
          minLength='5'
          className='validate'
          value={loginFormData.username}
          onChange={e => handleFormChange(e, 'username')}
        />
        <label htmlFor='username'>Username</label>
      </div>
      <div className='input-field'>
        <input
          id='password'
          ref={refs[1]}
          type='password'
          minLength='6'
          className='validate'
          required
          value={loginFormData.password}
          onChange={e => handleFormChange(e, 'password')}
        />
        <label htmlFor='password'>Password</label>
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
  )
}

export default LoginForm
