const auth = require('./lambda/auth')
const { twitterAuth } = require('./lambda/utils')
const axios = require('./plugins/axios.plugin')

async function getRegions() {
  const cities = await twitterAuth(() =>
    axios.get('/1.1/trends/available.json')
  )
  return {
    statusCode: 200,
    body: JSON.stringify({ cities })
  }
}

async function getTrends(evt) {
  const { id } = evt.queryStringParameters
  const data = await twitterAuth(() =>
    axios.get('/1.1/trends/place.json', {
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
