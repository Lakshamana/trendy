import { toast } from 'materialize-css/dist/js/materialize'

function sendToast() {
  toast({ html: 'Error!' })
}

export { sendToast }
