import React, { useState, useEffect } from 'react'
import axios from 'axios'

import ShowCountries from './components/ShowCountries'

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [selected, setSelected] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(res => {
      setCountries(res.data)
    })
  }, [])  

  const handleChange = (e) => {
    setQuery(e.target.value)
    setSelected(countries.filter(country => 
      country.name.toLowerCase().includes(e.target.value.toLowerCase()))
    )
  }  

  return (
    <div>
      <div>
        find countries <input onChange={handleChange} value={query}/>
      </div>
      <div>
        <ShowCountries selected={selected} />
      </div>
    </div>
  )
}

export default App