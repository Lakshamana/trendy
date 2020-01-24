import { toast } from 'materialize-css/dist/js/materialize'
import cookies from 'js-cookie'

function sendToast() {
  toast({ html: 'Error!' })
}

function persist(key, val) {
  if (!key) return
  const flatten = !(typeof value === 'string') ? JSON.stringify(val) : val
  cookies.set(key, flatten)
}

function recover(key) {
  const val = key && cookies.get(key)
  try {
    return JSON.parse(val)
  } catch (e) {
    return val
  }
}

export { sendToast, persist, recover }
