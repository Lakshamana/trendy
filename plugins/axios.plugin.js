const axios = require('axios').default

const baseURL = 'https://api.twitter.com'
const instance = axios.create({ baseURL })

module.exports = instance
