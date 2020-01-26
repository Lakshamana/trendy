import React, { useState } from 'react'

const RegisterForm = () => {
  const [registerValidForm, setRegisterValidForm] = useState(false)

  const [registerFormData, setRegisterFormData] = useState({
    username: '',
    password: ''
  })

  let [refs] = useState(Array.from({ length: 2 }, () => React.createRef()))

  function checkFormValidity() {
    console.log('check!')
    const valid = refs.every(
      ({ current }) => current && current.value && current.validity.valid
    )
    setRegisterValidForm(valid)
  }

  function handleFormChange(e, field) {
    setRegisterFormData({
      ...registerFormData,
      [field]: e.target.value
    })
    checkFormValidity()
  }

  return (
    <form>
      <div className='input-field'>
        <input
          name='username'
          ref={refs[0]}
          type='text'
          className='validate'
          required
          minLength='5'
          onChange={e => handleFormChange(e, 'username')}
        />
        <label>Username</label>
      </div>
      <div className='input-field'>
        <input
          name='password'
          ref={refs[1]}
          type='password'
          className='validate'
          required
          minLength='6'
          value={registerFormData.password}
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
          disabled={!registerValidForm}
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default RegisterForm
