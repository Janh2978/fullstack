import React from 'react'

import ShowCountry from './ShowCountry'
import SelectCountry from './SelectCountry'

const ShowCountries = ({ selected }) => {
  return selected.length > 10
  ? (<div>Too many matches, specify another filter</div>)
  : 
    selected.length === 1
    ? (<ShowCountry country={selected[0]} />)
    : 
      selected.map(s => (
        <div key={s.name}>
          {s.name}
          <SelectCountry country={s}/>
        </div>
      ))
}

export default ShowCountries