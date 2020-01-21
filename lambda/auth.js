const { hashSync, compareSync } = require('bcrypt')
const { DynamoDB } = require('aws-sdk')
const { tokenSign, tokenVerify, getCookie } = require('./utils')

const db = new DynamoDB.DocumentClient({ region: 'sa-east-1' })

async function register(evt) {
  const { username, password } = JSON.parse(evt.body)
  console.log(username, password)
  if (!username || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        messageCode: 'badRequestPayload'
      })
    }
  }

  console.log('before get user')
  const { Item } = await db
    .get({
      TableName: 'Users',
      Key: {
        username
      }
    })
    .promise()
  console.log('after get user:', Item)

  if (Item) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        messageCode: 'usernameAlreadyExists'
      })
    }
  }

  const params = {
    TableName: 'Users',
    Item: { username, password: hashSync(password, 12) }
  }

  await db.put(params).promise()

  return { statusCode: 201, body: JSON.stringify({}) }
}

async function login(evt) {
  const { username, password, rememberMe } = JSON.parse(evt.body)

  if (!username || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        messageCode: 'badRequestPayload'
      })
    }
  }

  const { Item } = await db
    .get({
      TableName: 'Users',
      Key: {
        username
      }
    })
    .promise()

  if (!Item) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        messageCode: 'usernameDoesNotExist'
      })
    }
  }

  if (!compareSync(password, Item.password)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        messageCode: 'authDataMismatch'
      })
    }
  }

  const accessToken = tokenSign({ Item, rememberMe })
  return {
    statusCode: 200,
    headers: { 'Set-Cookie': { accessToken } },
    body: JSON.stringify({})
  }
}

function auth(evt, _, cb) {
  const { accessToken } = getCookie(evt.headers)
  if (!accessToken) {
    cb(null, {
      statusCode: 400,
      body: JSON.stringify({
        messageCode: 'badAuthPayload'
      })
    })
  }

  try {
    tokenVerify(accessToken)
  } catch (e) {
    cb(null, {
      statusCode: 400,
      body: JSON.stringify({
        messageCode: 'badAuthPayload'
      })
    })
  }

  cb(null, {
    statusCode: 200,
    body: JSON.stringify({})
  })
}

module.exports = { register, login, auth }
