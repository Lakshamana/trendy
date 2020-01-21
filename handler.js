const auth = require('./lambda/auth')
const { twitterAuth } = require('./lambda/utils')
const axios = require('./plugins/axios.plugin')

async function getRegions() {
  const cities = await twitterAuth(token =>
    axios.get('/1.1/trends/available.json', {
      headers: { Authorization: 'Bearer ' + token }
    })
  )
  return {
    statusCode: 200,
    body: JSON.stringify({ cities })
  }
}

async function getTrends(evt) {
  const { id } = evt.queryStringParameters
  const data = await twitterAuth(token =>
    axios.get('/1.1/trends/place.json', {
      headers: { Authorization: 'Bearer ' + token },
      params: { id }
    })
  )
  const { trends } = data[0]
  return {
    statusCode: 200,
    body: JSON.stringify({ trends })
  }
}

module.exports = { ...auth, getRegions, getTrends }
