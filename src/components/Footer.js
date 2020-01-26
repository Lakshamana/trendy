import React from 'react'
import './css/Footer.css'

const Footer = () => {
  return (
    <footer className='page-footer'>
      <div className='center'>Made with &lt;3 by Lakshamana</div>
    </footer>
  )
}

const withFooter = WrappedComponent => props => [
  <WrappedComponent {...props} key='1' />,
  <Footer key='2' />
]

export default withFooter
