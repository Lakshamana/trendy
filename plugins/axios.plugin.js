const axios = require('axios').default

const baseURL = 'https://bepzok3gq8.execute-api.sa-east-1.amazonaws.com/dev'
const instance = axios.create({ baseURL })

module.exports = instance
