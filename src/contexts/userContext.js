import { createContext } from 'react'

const defaultUser = {
  username: '',
  lastLogin: undefined
}

const UserContext = createContext(defaultUser)

export { UserContext, defaultUser }
