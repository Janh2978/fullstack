import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ShowCountry = ({ country }) => {
  const [temp,setTemp] = useState('')
  const [img,setImg] = useState('')
  const [windVeloc, setWindVeloc] = useState('')
  const [windDirec, setWindDirec] = useState('')

  const params = {
    access_key: '1b517d8a88afd16a8028df08cc7f47de',
    query: country.capital
  }

  useEffect(() => {
    axios.get('http://api.weatherstack.com/current?', {params})
    .then(res => {
      setTemp(res.data.current.temperature)
      setImg(res.data.current.weather_icons[0])
      setWindVeloc(res.data.current.wind_speed)
      setWindDirec(res.data.current.wind_dir)      
    }).catch(err => {
      console.log(err);
    });
  }, [params])

  return (
    <>
      <h1>{country.name}</h1>
      <div>Capital {country.capital}</div>
      <div>Population {country.population}</div>
      <h2>Languages</h2>
      <div>
        <ul>
          {country.languages.map(e => (
            <li key={e.name}>{e.name}</li>
          ))}
        </ul>
      </div>
      <img 
        src={country.flag} 
        style={{width: '140px'}} 
        alt="country flag"
      />
      <h2>Weather in {country.capital}</h2>
      <div>
        <strong>temperature: </strong>{temp} Celsius
      </div>
      <img src={img} alt="weather icon" />
      <div>
        <strong>wind: </strong>{windVeloc} kph 
        direction {windDirec}
      </div>
    </>
  )
}

export default ShowCountry