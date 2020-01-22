import React, { useState, useEffect } from 'react'
// import { Autocomplete } from 'materialize-css/dist/js/materialize'
// import './css/Home.css'

const axios = require('../../plugins/axios.plugin')
const { trendyAPI } = require('../../shared/app.constants')

// /**
//  * Use it to materialize css autocomplete
//  * @param {Array} regionList [region1, region2, ...]
//  * @param {*} fillWithValue any js-valid value
//  * @returns {Object} {region1: fillWithValue, region2: fillWithValue, ...}
//  */
// function toMap(regionList, fillWithValue) {
//   return regionList.reduce((a, c) => {
//     return {
//       ...a,
//       [c.woied + ' - ' + c.name]: fillWithValue
//     }
//   }, {})
// }

const Home = () => {
  const [tweets] = useState([])
  const [regions, setRegions] = useState([])
  let autocompleteRef = React.createRef()

  useEffect(() => {
    axios.get(trendyAPI + '/regions').then(({ data }) => {
      const cities = data.cities.slice(1, 100)
      setRegions(cities)
      console.log('regions:', regions)
      // Autocomplete.init([autocompleteRef.current], {
      //   data: toMap(cities, null),
      //   onAutocomplete: val => console.log('completou com valor:', val)
      // })
      // instance = Autocomplete.getInstance(autocompleteRef.current)
    })
  }, [])

  const renderTweets = tweets.length ? (
    tweets.map(post => {
      const { name, url, tweet_volume } = post
      return (
        <div className='card indigo lighten-4' key={name}>
          <div className='card-content'>
            <span className='card-title blue-text'>
              <strong>{'>> ' + name}</strong>
            </span>
            <a href={url}>url</a>
            <span className='gray-text'>Volume: {tweet_volume}4118</span>
          </div>
        </div>
      )
    })
  ) : (
    <div className='center'>Choose a place first!</div>
  )
  return (
    <div className='container'>
      <div className='row'>
        <div className='col s12'>
          <div className='input-field'>
            <input
              ref={autocompleteRef}
              type='text'
              id='autocomplete-input'
              className='autocomplete'
              placeholder='Search place...'
            />
          </div>
          <br />
          {renderTweets}
        </div>
      </div>
    </div>
  )
}

export default Home
