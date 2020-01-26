import React, { useState, useEffect } from 'react'
import { Autocomplete } from 'materialize-css/dist/js/materialize'
import './css/Home.css'
import { sendToast } from '../util/util'

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
  const [choosenCity, setChoosenCity] = useState('')

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
            setChoosenCity(val.split('-')[1].trim())
          }
        })
        setCities(cities)
      })
      .catch(({ response }) => sendToast(response.data.messageCode))
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
            <span className='gray-text'>Volume: {tweet_volume || 0}</span>
          </div>
        </div>
      )
    })
  ) : !choosenCity ? (
    <div className='center white-text'>Choose a place first!</div>
  ) : (
    <div className='center white-text'>Loading...</div>
  )
  return (
    <div className='img-back'>
      <div className='smoke-layer'>
        <div className='container'>
          <div className='row'>
            <div className='col s12'>
              <div className='input-field ipt-style'>
                <label htmlFor='ipt'>Search place...</label>
                <input
                  ref={autocompleteRef}
                  type='text'
                  id='ipt'
                  className='autocomplete'
                  onFocus={handleFocus}
                />
              </div>
              <br />
              {renderTopics}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
