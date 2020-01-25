import { recover } from '../../util/util'
const {
  SECS_PER_DAY,
  REMEMBER_ME_DEFAULT_FACTOR
} = require('../../../shared/app.constants')

export default function checkAuth() {
  return new Promise((resolve, reject) => {
    const user = recover('username')
    const lastLogin = recover('lastLogin') // ms
    const rememberMe = recover('rememberMe')

    const ttl =
      1000 * SECS_PER_DAY * (rememberMe ? REMEMBER_ME_DEFAULT_FACTOR : 1)
    const exp = lastLogin + ttl
    if (!user || Date.now() > exp) {
      // Redirect user to auth route
      reject(false)
    }
    resolve(user)
  })
}
