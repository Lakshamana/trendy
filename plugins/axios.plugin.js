const axios = require('axios').default
const { twitterAPI, trendyAPI } = require('../shared/app.constants')

const twitterAxios = axios.create({ baseURL: twitterAPI })
const trendyAxios = axios.create({ baseURL: trendyAPI })

module.exports = { twitterAxios, trendyAxios }
