const axios = require('axios').default

const baseURL = 'https://api.twitter.com'
const instance = axios.create({ baseURL })
// instance.interceptors.request.use(config => {
//   if (config.url !== '/oauth2/token') {
//     config.headers.Authorization = 'Bearer '
//   }
// })

module.exports = instance
