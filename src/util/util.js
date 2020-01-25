import { toast } from 'materialize-css/dist/js/materialize'
import cookies from 'js-cookie'

function sendToast(msg) {
  toast({ html: msg })
}

function persist(key, val) {
  if (!key) return
  cookies.set(key, val)
}

function recover(key) {
  return key && cookies.get(key)
}

export { sendToast, persist, recover }
