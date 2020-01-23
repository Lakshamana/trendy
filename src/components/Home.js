import React, { useState, useEffect } from 'react'
import { Autocomplete } from 'materialize-css/dist/js/materialize'
// import './css/Home.css'

const { trendyAxios } = require('../../plugins/axios.plugin')

/**
 * Use it to materialize css autocomplete
 * @param {Array} regionList [region1, region2, ...]
 * @param {*} fillWithValue any js-valid value
 * @returns {Object} {region1: fillWithValue, region2: fillWithValue, ...}
 */
function toMap(regionList, fillWithValue) {
  return regionList.reduce((a, c) => {
    return {
      ...a,
      [c.woeid + ' - ' + c.name]: fillWithValue
    }
  }, {})
}

const Home = () => {
  const [topics, setTopics] = useState([])
  const [, setCities] = useState([])
  let autocompleteRef = React.createRef()

  useEffect(() => {
    trendyAxios
      .get('/regions')
      .then(({ data }) => {
        const cities = data.cities.slice(1, 101)
        Autocomplete.init(autocompleteRef.current, {
          data: toMap(cities, null),
          onAutocomplete: val => {
            const id = val.split('-')[0].trim()
            fetchTrendsByWoeid(id)
          }
        })
        setCities(cities)
      })
      .catch(err => console.log(err))
  }, [])

  function fetchTrendsByWoeid(id) {
    trendyAxios
      .get('/trends', {
        params: { id }
      })
      .then(({ data }) => setTopics(data.trends))
  }

  function handleFocus(e) {
    if (e.target.value) {
      e.target.value = ''
    }
  }

  const renderTopics = topics.length ? (
    topics.map(post => {
      const { name, url, tweet_volume } = post
      return (
        <div className='card indigo lighten-4' key={name}>
          <div className='card-content'>
            <span className='card-title blue-text'>
              <a href={url}>{name}</a>
            </span>
            <span className='gray-text'>Volume: {tweet_volume}</span>
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
              onFocus={handleFocus}
            />
          </div>
          <br />
          {renderTopics}
        </div>
      </div>
    </div>
  )
}

export default Home
